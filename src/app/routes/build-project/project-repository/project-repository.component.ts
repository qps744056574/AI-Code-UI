import { Component, OnInit } from '@angular/core';
import {ProjectStepsComponent} from "../project-steps/project-steps.component";
import {Setting} from "../../../public/setting/setting";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BuildProjectService} from "../build-project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-project-repository',
  templateUrl: './project-repository.component.html',
  styleUrls: ['./project-repository.component.css']
})
export class ProjectRepositoryComponent implements OnInit {

  guideLang: any = Setting.PAGEMSG;                  //引导语
  validateForm: FormGroup;
  _loading: boolean = false;                 //查询时锁屏,默认关闭
  type: string;                               //路由携带的参数
  buildProInfo:any;                           //当前项目的信息
  routerProjectCode:string;                           //路由传递过来的项目的编码
  constructor(public fb: FormBuilder,
              public buildProjectService:BuildProjectService,
              public routeInfo: ActivatedRoute,
              public router: Router,
              public steps:ProjectStepsComponent) {
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      account: ['', [Validators.required,Validators.maxLength(50)]],
      password: ['', [Validators.required,Validators.maxLength(50)]],
      type: ['Git'],
      home: ['', [Validators.required,Validators.maxLength(50)]],
      description: ['', [Validators.required,Validators.maxLength(100)]],
    });
    this.steps.current = 3;//添加项目的进度条
  }

  ngOnInit() {
    let me = this;
    me.type = me.routeInfo.snapshot.queryParams['type'];
    me.routerProjectCode = me.routeInfo.snapshot.queryParams['projectCode'];
    me.spectPreStep();

  }

  /**
   * 检查上一步是否填写，如果没有跳回到上一步
   */
  spectPreStep(){
    let me=this;
    if(me.routerProjectCode){
      sessionStorage.setItem('projectCode',me.routerProjectCode)
    }
    let data={
      code:me.routerProjectCode||sessionStorage.getItem('projectCode')
    };
    $.when(me.buildProjectService.loadProject(data)).done(result => {
      me.buildProInfo=result;
      if (me.type == 'edit') {
        me.loadRepository();
      }
      if(!isNullOrUndefined(result)){
        if(!result.projectFramworkList.length){
          me.skipTo(2,'add')
        }
      }
    });
  }

  /**
   * 编辑时load仓库信息
   * @param event
   * @param curPage
   */
  public loadRepository() {
    let me = this;
    let code=me.enable(me.buildProInfo.projectRepositoryAccountList).code;
    if(code||sessionStorage.getItem('repositoryCode')){
      let data={
        code:code||sessionStorage.getItem('repositoryCode')
      };
      $.when(me.buildProjectService.loadRepository(data)).done(data => {
        me.validateForm = me.fb.group({
          account: [data.account, [Validators.required,Validators.maxLength(50)]],
          password: [data.password, [Validators.required,Validators.maxLength(50)]],
          type: [data['type']],
          home: [data.home, [Validators.required,Validators.maxLength(50)]],
          description: [data.description, [Validators.required,Validators.maxLength(100)]],
        });
      })
    }
  }

  /**
   * 过滤出能够使用的
   */
  enable(data){
    for(let i=0;i<data.length;i++){
      if(data[i].state=='Enable'){
        return data[i]
      }
    }
  }

  /**
   * 获取每个输入框的状态
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  /**
   * 跳转页面
   * @param step 跳转到的哪步
   * @param type 新增还是修改
   */
  skipTo(step,type) {
    this.buildProjectService.routerSkip(step,type);
  }

  /**
   * 完成
   */
  nextStep($event,validateForm){
    $event.preventDefault();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
    let me=this;
    if(!validateForm.valid){
      return;
    }
    switch (me.type){
      case 'add':{
        validateForm.value['projectCode']=me.routerProjectCode||sessionStorage.getItem('projectCode');
        $.when(me.buildProjectService.buildRepository(validateForm.value)).always(data => {
          me._loading = false;//解除锁屏
          if (data) {
            sessionStorage.setItem('repositoryCode',data.code);
            me.router.navigate([SettingUrl.ROUTERLINK.project.detail], {queryParams: {code: sessionStorage.getItem('projectCode')}});
          }
        });
        break;
      }
      case 'edit':{
        let item=me.enable(me.buildProInfo.projectRepositoryAccountList);
        validateForm.value['projectCode']=me.routerProjectCode||sessionStorage.getItem('projectCode');
        validateForm.value['code']=item.code;//版本库的编码
        validateForm.value['state']=item.state;//版本库状态
        $.when(me.buildProjectService.modifyRepository(validateForm.value)).always(data => {
          me._loading = false;//解除锁屏
          if (data) {
            sessionStorage.setItem('repositoryCode',data.code);
            me.router.navigate([SettingUrl.ROUTERLINK.project.detail], {queryParams: {code: sessionStorage.getItem('projectCode')}});
          }
        });
        break;
      }
    }
  }
}
