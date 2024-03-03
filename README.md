# tronVanity
Vanity Address for Tron Blockchain
# Pre-requisites
NodeJS 16
php7 (works with 7.1, 7.2, 7.3)

know how to change directory permissions
# Installation
New script with nodejs v16 using worker threads to improve speed. Settings for case sensitive and string start in worker.js

OLD LEGACY PHP CODE: `git clone` the entire repo into your preffered directory. Open up VanityAddress.php in your derired editor and change the value of $checkString. 
After the process is complete, it will store a file in the same directory, make sure you have changed the directory permissions to _at least php can read and write._ Best, 755

Time difference of approx 4x on smaller strings (<= 3 characters) and unknown on longer strings
