#!/bin/bash

# Change to the project directory
cd /var/www/html/myfirstsite

# Pull the latest changes from the remote repository
git pull

# Check the exit status of the git pull command
if [ $? -eq 0 ]; then
    echo "Git pull successful. Website updated."
else
    echo "Git pull failed. Website not updated."
fi
