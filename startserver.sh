#!/bin/bash - 
#===============================================================================
#
#          FILE: startserver.sh
# 
#         USAGE: ./startserver.sh 
# 
#   DESCRIPTION: Starts the blackboard binder server
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Tyler Stapler (tstapler), tystapler@gmail.com
#  ORGANIZATION: 
#       CREATED: 02/27/2016 13:09
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

if [[ $USER == "vagrant" ]]; then 
	echo "Username is vagrant"
python /vagrant/app/views.py
else
echo "Username is $USER"
python app/views.py
fi

