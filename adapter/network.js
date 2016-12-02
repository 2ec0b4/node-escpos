'use strict';
const net     = require('net');
const Adapter = require('../adapter');

/**
 * Network Adapter
 * @param {[type]} address
 * @param {[type]} port
 */
function Network(address, port){
  Adapter.call(this);
  this.address = address;
  this.port = port || 9100;
  this.device = new net.Socket();
  return this;
};

/**
 * connect to remote device
 * @praram {[type]} callback
 * @return
 */
Network.prototype.open = function(callback){
  var self = this;
  //connect to net printer by socket (port,ip)
  this.device.connect(this.port, this.address, function(err){
    self.emit('connect', self.device);
    callback && callback(err, self.device);
  });
  return this;
};

/**
 * write data to printer
 * @param {[type]} data -- byte data
 * @return 
 */
Network.prototype.write = function(data, callback){
  this.device.write(data, callback);
  return this;
};

/**
 * [close description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Network.prototype.close = function(callback){
  if(this.device){
    this.device.destroy();
    this.device = null;
  }
  this.emit('disconnect', this.device);
  callback && callback(null, this.device);
  return this;
}

module.exports = Adapter.extends(Network);
