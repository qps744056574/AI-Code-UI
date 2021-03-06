import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {Router} from "@angular/router";

declare var $: any;
@Injectable()
export class BuildProjectService {

  projectCode: string = '';               //存储项目的编码
  constructor(public router: Router,
              public _notification: NzNotificationService) {
  }

  /**
   * 新建项目
   * @param requestDate
   * @param callback
   */
  buildProject(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.projectCtrl.build,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 修改项目
   * @param requestDate
   * @param callback
   */
  modifyProject(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.projectCtrl.modify,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
          me._notification.success(`成功了`, res.info)
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 加载项目的信息
   */
  loadProject(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.projectCtrl.load,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 修改sql
   * @param requestDate
   * @param callback
   */
  modifySql(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.projectSqlCtrl.modify,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info);
          defer.reject(res.data);
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 创建项目sql
   * @param requestDate
   * @param callback
   */
  buildProjectSql(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.projectSqlCtrl.build,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 加载项目SQL的信息
   */
  loadSql(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.projectSqlCtrl.load,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 执行脚本
   * @param requestDate
   * @param callback
   */
  projectInit(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.projectCtrl.init,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info);
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 获取技术框架的数据
   * @param requestDate
   * @param callback
   */
  framesList(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.frameworksCtrl.list,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 关联技术框架
   * @param requestDate
   * @param callback
   */
  linkFrames(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.projectFramworkCtrl.add,
      data: {projectStr: JSON.stringify(requestDate)},
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 关联技术框架
   * @param requestDate
   * @param callback
   */
  modifyFrames(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.projectFramworkCtrl.add,
      data: {projectStr: JSON.stringify(requestDate)},
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 新增技术框架
   * @param requestDate
   * @param callback
   */
  buildFrames(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.frameworksCtrl.list,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
 * 创建账户
 * @param requestDate
 * @param callback
 */
buildRepository(requestDate: any) {
  let me = this, defer = $.Deferred(); //封装异步请求结果
  AjaxService.post({
    url: SettingUrl.URL.projectRepositoryAccountCtrl.build,
    data: requestDate,
    success: (res) => {
      if (res.success) {
        me._notification.success(`成功了`, res.info);
        defer.resolve(res.data);
      } else {
        me._notification.error(`出错了`, res.info)
      }
    },
    error: () => {
      me._notification.error(`出错了`, '失败，请稍后重试')
    }
  });
  return defer.promise();
}

  /**
   * 修改账户
   * @param requestDate
   * @param callback
   */
  modifyRepository(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.projectRepositoryAccountCtrl.modify,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me._notification.success(`成功了`, res.info);
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * load账户
   * @param requestDate
   * @param callback
   */
  loadRepository(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.projectRepositoryAccountCtrl.load,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: () => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current, type) {
    switch (current) {
      case 0 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proInfo], {'queryParams': {'type': type}});
        break;
      case 1 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proSql], {'queryParams': {'type': type}});
        break;
      case 2 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proFrames], {'queryParams': {'type': type}});
        break;
      case 3 :
        this.router.navigate([SettingUrl.ROUTERLINK.buildPro.proRepository], {'queryParams': {'type': type}});
        break;
    }
  }
}
