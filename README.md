# AirBnB Clone v4 - Web Dynamic

## Table of Contents
* [Environment](#environment)
* [Installation](#installation)
* [Usage](#usage)
* [The Console](#the-console)
    * [Functionalities](#console_func)
    * [File Descriptions](#console_files)
    * [Examples of Use](#console_ex)
* [Web Dynamic](#web-dynamic)
    * [Functionalities](#dynamic_func)
    * [File Descriptions](#dynamic_files)
    * [Examples](#dynamic_ex)
* [Bugs](#bugs)
* [Authors](#authors)
* [License](#license)

## Environment
This project is interpreted/tested on Ubuntu 14.04 LTS using python3 (version 3.4.3)

## Installation
* Clone this repository: `git clone "https://github.com/michellegsld/AirBnB_clone_v4"`
* Access AirBnb directory: `cd AirBnB_clone_v4`
* Run hbnb(interactively): `./console` and enter command
* Run hbnb(non-interactively): `echo "<command>" | ./console.py`

## The Console
The console was the first segment of the AirBnB project at Holberton School that collectively covered the fundamental concepts of higher level programming. The goal of this AirBnB project was to eventually deploy our server a simple copy of the AirBnB Website(HBnB). A command interpreter was created in this segment to manage objects for the AirBnB(HBnB) website.

### Functionalities <a id="console_func"></a>
* Create a new object (ex: a new User or a new Place)
* Retrieve an object from a file, a database etc...
* Do operations on objects (count, compute stats, etc...)
* Update attributes of an object
* Destroy an object

### File Descriptions <a id="console_files"></a>
[console.py](console.py) - the console contains the entry point of the command interpreter. 
List of commands this console current supports:
* `EOF` - exits console 
* `quit` - exits console
* `<emptyline>` - overwrites default emptyline method and does nothing
* `create` - Creates a new instance of`BaseModel`, saves it (to the JSON file) and prints the id
* `destroy` - Deletes an instance based on the class name and id (save the change into the JSON file). 
* `show` - Prints the string representation of an instance based on the class name and id.
* `all` - Prints all string representation of all instances based or not on the class name. 
* `update` - Updates an instance based on the class name and id by adding or updating attribute (save the change into the JSON file). 

#### `models/` directory contains classes used for this project:
[base_model.py](/models/base_model.py) - The BaseModel class from which future classes will be derived
* `def __init__(self, *args, **kwargs)` - Initialization of the base model
* `def __str__(self)` - String representation of the BaseModel class
* `def save(self)` - Updates the attribute `updated_at` with the current datetime
* `def to_dict(self)` - returns a dictionary containing all keys/values of the instance

Classes inherited from Base Model:
* [amenity.py](/models/amenity.py)
* [city.py](/models/city.py)
* [place.py](/models/place.py)
* [review.py](/models/review.py)
* [state.py](/models/state.py)
* [user.py](/models/user.py)

#### `/models/engine` directory contains File Storage class that handles JSON serialization and deserialization :
[file_storage.py](/models/engine/file_storage.py) - serializes instances to a JSON file & deserializes back to instances
* `def all(self)` - returns the dictionary __objects
* `def new(self, obj)` - sets in __objects the obj with key <obj class name>.id
* `def save(self)` - serializes __objects to the JSON file (path: __file_path)
* ` def reload(self)` -  deserializes the JSON file to __objects

### Examples of Use <a id="console_ex"></a>
```
vagrantAirBnB_clone$./console.py
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  create  destroy  help  quit  show  update

(hbnb) all MyModel
** class doesn't exist **
(hbnb) create BaseModel
7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) all BaseModel
[[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}]
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}
(hbnb) destroy BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
** no instance found **
(hbnb) quit
```

## Web Dynamic
Web dynamic was the final segment of the AirBnB project at Holberton School. The goal of this AirBnB project was to deploy the final version of the AirBnB Website(HBnB). This was done by loading objects on the client-side, through the usage of RESTful API and jQuery.

### Functionalities <a id="dynamic_func"></a>
* Display any or all Places the exist within the database
* Able to filter Place locations by State/City
* Able to filter Places by Amenities
* Ability to toggle view of all Reviews on a Place
* Notification of API usage
    * Grey if no connection
    * Colored on connection


### File Descriptions <a id="dynamic_files"></a>
Everything added for the creation of the final version of AirBnB was added to the directory `web_dynamic`.

#### Files that work together to create the final website:
[101-hbnb.py](web_dynamic/101-hbnb.py) - The Flash Web Application file used to access the final website. Contains the route the client inputs and determines which HTML to deliver.
Located in: `web_dynamic/101-hbnb.py`

[101-hbnb.html](web_dynamic/templates/101-hbnb.html) - The HTML used to display the website. It was simplified and calls upon a jQuery script instead to load the rest of the website. Basically a template to be populated with data.
Located in: `web_dynamic/templates/101-hbnb.py`

[101-hbnb.js](web_dynamic/static/scripts/101-hbnb.js) - The final jQuery script used to load all necessary objects on the client side. Essentially fills the website with data in order to make the working final website.
Located in: `web_dynamic/static/scripts/101-hbnb.js`

#### Directories and the type of files located here:
* `web_dynamic/` - Contains different versions of `*-hbnb.py` and hence different versions of Flash Web Applications.
* `web_dynamic/templates/` - Contains all versions of the `*-hbnb.html` HTML files.
* `web_dynamic/static/scripts/` - Holds all versions of the `*-hbnb.js` jQuery Scripts.
* `web_dynamic/static/styles/` - Has every `.css` file used in the AirBnB web site.
* `web_dynamic/static/images/` - Where every image used in the AirBnB website is located.

### Examples <a id="dynamic_ex"></a>
To host the api:
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=5001 python3 -m api.v1.app
```

To host the webpage:
```
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db python3 -m web_dynamic.101-hbnb
```

## Bugs
No known bugs at this time. 

## Authors
Michelle Giraldo - [Github](https://github.com/michellegsld) / [Twitter](https://twitter.com/michellegsld)  
Jennifer Huang - [Github](https://github.com/jhuang10123) / [Twitter](https://twitter.com/earthtojhuang)  
Justin Majetich - [Github](https://github.com/justinmajetich) / [Twitter](https://twitter.com/JustinMajetich)  
Alexa Orrico - [Github](https://github.com/alexaorrico) / [Twitter](https://twitter.com/alexa_orrico)  
David Ovalle - [Github](https://github.com/Nukemenonai) / [Twitter](https://twitter.com/disartDave)  
Jhoan Zamora - [Github](https://github.com/jzamora5) / [Twitter](https://twitter.com/JhoanZamora10)  

Second part of Airbnb: Joann Vuong
## License
Public Domain. No copy write protection. 
