#!/bin/bash - 
#===============================================================================
#
#          FILE: headless_setup.sh
# 
#         USAGE: ./headless_setup.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Tyler Stapler, 
#  ORGANIZATION: 
#       CREATED: 02/21/2016 02:57
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

Xvfb :1 -screen 5 1024x768x8 &

export DISPLAY=:1.5

