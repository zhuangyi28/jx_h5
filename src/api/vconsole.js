/**
 * Created by ZHUANGYI on 2018/11/6.
 */
import Vconsole from 'vconsole';

//var vConsole = new Vconsole();


if(/*process.env.NODE_ENV=='development'*/0)
 {
  var vConsole = new Vconsole();
}
else{
  var vConsole={}
}


export default vConsole;
