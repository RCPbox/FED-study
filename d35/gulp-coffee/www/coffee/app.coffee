list = [console, log, warning, error, info] 
show_list = (args...)->
	for item in args when item isnt log
		item


maker=
	google:
		site:google.com