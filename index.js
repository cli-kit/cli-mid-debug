var Flag = require('cli-define').Flag;

/**
 *  Adds a debug flag to the program.
 *
 *  When this option is specified the configuration trace
 *  property is enabled to always print stack traces for errors.
 *
 *  If a *log* property exists on the program then the log level is set
 *  to be as verbose as possible.
 *
 *  @param name The option name.
 *  @param description The option description.
 */
module.exports = function(name, description) {
  name = name || '--debug';
  description = description || 'enable stack traces';
  var opt = new Flag(name, description);
  var key = opt.key();
  this.flag(opt);
  this.once(key, function(req, arg, value) {
    this.configure().trace = value;
    if(value === true) {
      if(this.log) {
        this.log.level(
          this.log.bitwise ? this.log.BW_ALL : this.log.TRACE);
      }
    }
  })
  module.exports.key = key;
  return this;
}
