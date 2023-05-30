/*
 * @Description: 
 * @Version: 2.0
 * @Autor: zhuokunhao
 * @Date: 2023-05-30 14:33:15
 * @LastEditors: zhuokunhao
 * @LastEditTime: 2023-05-30 16:00:18
 */
import { createVNode, defineComponent, ref } from 'vue';
import classLes from './index.module.less'
import userImg from '@/assets/homeIcon/user.png'
import { Avatar } from 'ant-design-vue';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

import Events from '@/utils/Event';

const QHeader = defineComponent({
  name: 'QHeader',
  props:{
    userName:{
      type:String,
      default:'user'
    }
  },
  setup(this, props, ctx) {
    const menuFold = ref(false)
    /* 左边logo */
    const headerLeft = () => {
      if(menuFold.value){
        return <MenuUnfoldOutlined onClick={onMenu} class={classLes.qHeaderIcon} title="展开菜单" />
      }else{
        return <MenuFoldOutlined  onClick={onMenu} class={classLes.qHeaderIcon} title="收起菜单" />
      }
    }
    /* 右边登录信息 */
    const headerRight = () => {
      return createVNode('div',{
        class:`${classLes.qHeaderUser}`
      },[
        <Avatar src={userImg} />,
        createVNode('span',{class:`${classLes.qHeaderUserName}`},[props.userName]),
        <LogoutOutlined class={classLes.qHeaderIcon} title='退出登录' />
      ])
    }

    const onMenu = ()=>{
      menuFold.value = !menuFold.value
      Events.emit('foldMenu',menuFold.value)
    }

    return () => {
      return createVNode('div', {
        class: `${classLes.qHeader}`
      }, [headerLeft(), headerRight()])
    }
  },
})

export default QHeader