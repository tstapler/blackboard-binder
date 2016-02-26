#Script used to upload a whole file system to Google Drive keeping original stucture

#********************************#
#    Created by: Jacob Linch     #
#  Date Created: Feb 21st 2016   #
#         Title: Drive Upload    #
#       Version: 0.0.1           #
#********************************#

#Importing tools
from os import  walk, getcwd, chdir, listdir
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
import os
import sys 
#Authorize the key to access your Google Drvie
gauth = GoogleAuth()
gauth.LocalWebserverAuth() # Creates local webserver and auto handles authentication
drive = GoogleDrive(gauth)

def existCheck(files, folderId):
	file_list = drive.ListFile({'q': "'" + folderId + "'" + " in parents"}).GetList()
	allDriveTitlesIds = []
	for file1 in file_list:
		allDriveTitlesIds.append((file1['title'], file1['id']))
	return allDriveTitlesIds	

def createDir(files, folderId):
	#creating new folder in google drive
	#defining the folder name, target location, and file type	
	gfile = drive.CreateFile({'title': files,
	"parents":  [{"id": folderId}],
	"mimeType": "application/vnd.google-apps.folder"})
	gfile.Upload()

def updateId(folderId, files):
	file_list = drive.ListFile({'q': "'" + folderId + "'" + " in parents"}).GetList()
	allDriveTitlesIds = []
	for listed in file_list:
		allDriveTitlesIds.append((listed['title'], listed['id']))
	for title, identifier in allDriveTitlesIds:
		if files  == title:
			folderId  = identifier
			break
	return folderId

def createFile(files, folderId):
	f = drive.CreateFile({"parents": [{"kind": "drive#fileLink", "id": str(folderId) }]})
	f.SetContentFile(str(files))
	f.Upload()

def uploadFolder(path, ids):
	#defining variables in the function
	directoryList = listdir(path)
	folderId = ids
	newId = ' '
	chdir(path)
	for files in directoryList:
		fileList = existCheck(files, folderId)
		if files in str(fileList):
			if os.path.isdir(files):
				newId = updateId(folderId, files)
				uploadFolder(files, newId)
				chdir("..")
			else:
				pass
		elif os.path.isdir(files):
			createDir(files,folderId)
			newId = updateId(folderId, files)
			uploadFolder(files,newId)
			chdir("..")
		elif files == '.DS_Store' or files == 'settings.yaml' or files == 'credentials.json' or files == 'client_secrets.json' or files == 'infiniteUp.py':
			pass
		else:
			createFile(files, folderId)
		

uploadFolder(getcwd(),'root')
