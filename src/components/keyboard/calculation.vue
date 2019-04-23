 <template>

        <div class="calculation">
          <div class='input-box'>{{ money }}</div>
          <div class='keyboard' @click.stop='_handleKeyPress'>
            <div class='key-row'>
              <div class='key-cell' data-num='7'>7</div>
              <div class='key-cell' data-num='8'>8</div>
              <div class='key-cell' data-num='9'>9</div>
              <div class='key-cell' data-num='D'>
                <i class="iconfont icon-shanchu" data-num='D'></i>
              </div>
            </div>
            <div class='key-row'>
              <div class='key-cell' data-num='4'>4</div>
              <div class='key-cell' data-num='5'>5</div>
              <div class='key-cell' data-num='6'>6</div>
              <div class='key-cell' data-num='C'>清空</div>
            </div>
            <div class='key-row'>
              <div class='key-cell' data-num='1'>1</div>
              <div class='key-cell' data-num='2'>2</div>
              <div class='key-cell' data-num='3'>3</div>
              <div class='key-cell' data-num='-1'></div>
            </div>
            <div class='key-row'>
              <div class='key-cell disabled' data-num='-1'></div>
              <div class='key-cell' data-num='0'>0</div>
              <div class='key-cell' data-num='.'>.</div>
              <div class='key-cell' data-num='-1'></div>
            </div>
            <div class='key-confirm color_background' data-num='S'>确认</div>
          </div>
        </div>
</template>

<script>
    export default{

      name: 'calculation',

      props: {
        newNum: ''
      },

    	data(){
    		return{

          money : ''


            }
        },
        methods : {
			//处理按键
			_handleKeyPress(e) {

				let num = e.target.dataset.num;

				//不同按键处理逻辑
				// -1 代表无效按键，直接返回
				if (num == -1) return false;

				switch (String(num)) {
					//小数点
					case '.':
						this._handleDecimalPoint();
						break;
					//删除键
					case 'D':
						this._handleDeleteKey();
						break;
					//清空键
					case 'C':
						this._handleClearKey();
						break;
					//确认键
					case 'S':
						this._handleConfirmKey();
						break;
					default:
						this._handleNumberKey(num);
						break;
				}

				this.$emit('num',this.money);
			},
			//处理小数点函数
			_handleDecimalPoint() {
				//如果包含小数点，直接返回
				if (this.money.indexOf('.') > -1) return false;
				//如果小数点是第一位，补0
				if (!this.money.length)
					this.money = '0.';

				//如果不是，添加一个小数点
				else
					this.money = this.money + '.';

			},
			//处理删除键
			_handleDeleteKey() {
				let S = this.money;
				//如果没有输入，直接返回
				if (!S.length) return false;
				//否则删除最后一个
				this.money = S.substring(0, S.length - 1);

			},
			//处理清空键
			_handleClearKey() {
				this.money = '';
			},
			//处理数字
			_handleNumberKey(num) {
				let S = this.money;

				//如果有小数点且小数点位数不小于2
				if ( S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
					this.money = S + num;


				//没有小数点
				if (!(S.indexOf('.') > -1)) {
					//如果第一位是0，只能输入小数点
					if (num == 0 && S.length == 0)
						this.money = '0';

					else {
						if (S.length && Number(S.charAt(0)) === 0) return;
						this.money = S + num;
					}

				}

			},
			//提交
			_handleConfirmKey() {
				//let S = this.money;
				//未输入
				/*if (!S.length){
					alert( '您目前未输入!' )
					return false;
				}*/

				/*//将 8. 这种转换成 8.00
				if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
					S = Number(S.substring(0, S.length - 1)).toFixed(2);
				//保留两位
				S = Number(S).toFixed(2);
				this.$emit('confirmEvent',S)*/
				this.$emit('inputClose',false);
			}

        },

      mounted() {
        this.money = this.newNum;
      }
    }
</script>

<style lang="less" scoped>

  @import "calculation.less";

</style>
