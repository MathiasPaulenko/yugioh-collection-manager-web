# yugioh-backend
 This repository stores the backend of the Yu-Gi-Oh!


## Install Commands:

### Install Virtual Environment

Create a virtual env
````bash
$ python3 -m venv venv-name
````

Start virtual env

Windows:
````bash
$ path/to/venv/Script/activate
````

Linux:
````bash
$ source path/to/venv/Script/activate
````


### Install Library Dependencies
````bash
$ pip install -r requirements.txt
````


### Django Commands

Prepare migrations
````bash
$ python manage.py makemigrations
````

Perform the migration
````bash
$ python manage.py migrate
````

Create user
````bash
$ python manage.py createsuperuser
````