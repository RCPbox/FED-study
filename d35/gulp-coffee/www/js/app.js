var list, maker, show_list,
  slice = [].slice;

list = [console, log, warning, error, info];

show_list = function() {
  var args, i, item, len, results;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  results = [];
  for (i = 0, len = args.length; i < len; i++) {
    item = args[i];
    if (item !== log) {
      results.push(item);
    }
  }
  return results;
};

maker = {
  google: {
    site: google.com
  }
};

//# sourceMappingURL=maps/app.js.map
