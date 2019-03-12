/**
 * using CommonJS...
 * Determin ENV
 * load the common
 * merge in the ENV file config
 * run the loadPresets
 */

/** 
 * to	    {String}	undefined	Destination File Path
 * map	  {String|Object}	false	Enable/Disable Source Maps
 * from	  {String}	undefined	Source File Path
 * parser	{String|Function}	false	Custom PostCSS Parser
 * syntax	{String|Function}	false	Custom PostCSS Syntax
 * stringifier	{String|Function}	false	Custom PostCSS Stringifier.
*/
module.exports = ({ env }) => ({
  plugins: [
    env === 'production' ? require('postcss-plugin')() : false
  ]
})
