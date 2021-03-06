# REPO_OWNER name and PROJECT_NAME must be lowercase
REPO_OWNER=tstapler
PROJECT_NAME=blackboard-binder

IMAGE_TAG=$(REPO_OWNER)/$(PROJECT_NAME)_dev

# Build the docker container
DOCKER_BUILD=docker build . -t $(IMAGE_TAG)

# Ensure the container is built and execute a command in it
DOCKER_RUN=$(DOCKER_BUILD) && docker run -it -v $(CURDIR):/$(PROJECT_NAME) $(IMAGE_TAG) sh -c

# Run before every command executed in the container
DOCKER_PRETASK=cd /$(PROJECT_NAME) && make local-format

# Run run local make target in a docker container ex: check-cfn -> local-checkcfn
RUN_LOCAL_COMMAND_IN_DOCKER=$(DOCKER_RUN) "$(DOCKER_PRETASK) && make local-$@"

# To execute 'local-{name}' rules in the docker container add '{name}' to DOCKER_RULES.
DOCKER_RULES= test format run

# Ignore files/directories with the same name as the target ex: "test"
.PHONY=$(DOCKER_RULES)

# When 'make test' is run, the makefile will run 'make local-test' in the docker container
$(DOCKER_RULES):
	$(RUN_LOCAL_COMMAND_IN_DOCKER)

# Add local rules which are run in the docker container
local-format:
	import-sort --write src/**/*.{js,jsx} && standard --global performance --global $$ --global chrome --fix src/**/*.{js,jsx} 

local-icon-gen:
	for size in "16" "19" "38" "48" "128"; do \
		inkscape -z -e src/assets/icon-$$sizex$$size.png -w $$size -h $$size src/assets/bbbinder-logo-128x128.svg; \
	done

local-publish:
	NODE_ENV=production npm run build
	zip -j blackboard-binder.zip build/*
