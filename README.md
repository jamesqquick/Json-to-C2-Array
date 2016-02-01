**JSON To C2 Array**
======
One common problem I have come across in using Construct 2 is trying to download high scores as JSON, and parsing that into an Array object.  Construct 2 needs a specially formatted JSON string to be able to load into and populate an array.  Previously, I would download the raw JSON string then do whatever manual parsing I need to to add the items into an array. I managed to get it working, but it was such a hassle!  This is why I created the JSON to C2 Array plugin.

This plugin will convert a raw JSON string of an array (typically useful for downloading high scores) to the specially formatted JSON string readable by the Array Object.  Therefore, after using this plugin to convert the string, you can load it directly into an array using Array->Load.

## **How to Use**

Clone the Xamarin Forms samples with the following command.

```$ git clone https://github.com/jamesqquick/Json-to-C2-Array.git ```

***Add the Plugin to Construct 2***
1. Close Construct 2
2.Copy the plugin's folder ***JsontoC2Array*** to <install path of Consturct 2>\exporters\html5\plugins. You'll see each plugin has its own folder here, so to add a new plugin create a new folder and add the plugin's files inside it.
3.Launch Construct 2 and the plugin or behavior should be available from the editor.

***Use the Plugin***
1. Use the plugin's ConvertJSON method with the raw JSON as the parameter as shown below.
  ConvertJSON("JSON string to be converted")


## **Technology**

 1. Construct 2
 2. Construct 2 Javascript SDK
 3. Visul Studio Code


## **Other Resources**
1. Construct 2 Plugin Reference - https://www.scirra.com/manual/69/plugins
2. Construct 2 Javascript SDK Reference - https://www.scirra.com/manual/15/sdk

## **Contact** ##
* **Website: http://jamesqquick.com**
* **Email: james.q.quick@outlook.com**
* **Twitter: [@jamesqquick](https:**//**twitter.com/jamesqquick)** 


