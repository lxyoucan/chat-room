import React, {Component} from 'react';

/**
 * 全局导航跳转工具类 by CrazyCodeBoy
 */
export default class NavigationUtil extends Component<Props> {
  /**
   * 跳转到指定页面
   * @param params 要传递的参数
   * @param page 要跳转的页面名Ff
   **/
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line prettier/prettier
            title:'',
    };
  }
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation;
    //const title = params.navigation.name;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    /*
            * navigation.navigate(
                page,
                {
                    ...params
                }
            )*/
    navigation.navigate(page, {
      ...params,
    });
  }

  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  /**
   * 重置到首页
   * @param navigation
   */
  static resetToHomPage(params) {
    const {navigation} = params;
    navigation.navigate('TabNav');
  }
}
