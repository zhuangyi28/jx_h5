/**
 * Created by ZHUANGYI on 2018/11/6.
 */
import Vconsole from 'vconsole';

if(
  1
//  process.env.NODE_ENV=='development'

) {
  var vConsole = new Vconsole();
}
else{
  var vConsole={}
}

export default vConsole;
