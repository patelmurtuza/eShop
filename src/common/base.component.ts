import { Injector } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DatePipe, ElementRef, Injectable, NgZone, Router, ViewChild } from 'angular.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Toaster } from 'ngx-toast-notifications';
import { GlobalSettings } from 'src/config/global-settings';
import { DBService } from 'src/providers/db.service';
import { SpliterConfig, UserMessages } from './constant';
import { MessageDialogConfig, DialogComponent } from './dialog.component';
import { DialogConfig, DialogConfirmComponent } from './dialogconfirm.component';

@Injectable()
export abstract class BaseComponent {
  public disableSaveButton = false;
  public buttonPanelAccess = new ButtonPanelAccess();
  public errorMsg = '';
  public entity: any;
  public GridResult: any[];
  public gridData: MatTableDataSource<any>;
  public loginSuccessObject: any;
  public logoImage = '../assets/toolboxIcon.png';
  public mode: string;
  public message: any;
  public panSize = 0;
  public saveCancelButton: Array<any>;
  public searchModel: any;
  public selectedRow: any;
  public spliterSepratorSize = 10;
  public saveCancelButtonPanelAccess = {
    showSaveButton: false,
    showCancelButton: false,
    showPrintButton: false,
    showSMSButton: false,
    showEmailButton: false
  };
  public togglePanel = new TogglePanel();
  public toggleViewPanel: any;
  public globalSettings: GlobalSettings;
  public service: DBService;
  public router: Router;
  public zone: NgZone;
  public dialog: MatDialog;
  public spinnerService: Ng4LoadingSpinnerService;
  public toaster: Toaster;
  public datepipe: DatePipe;
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  @ViewChild('splitAreaHeight', null) splitAreaHeightElem: ElementRef;
  controllerName: string;

  constructor(injector: Injector) {
    this.globalSettings = injector.get(GlobalSettings);
    this.service = injector.get(DBService);
    this.router = injector.get(Router);
    this.zone = injector.get(NgZone);
    this.dialog = injector.get(MatDialog);
    this.spinnerService = injector.get(Ng4LoadingSpinnerService);
    this.toaster = injector.get(Toaster);
    this.datepipe = injector.get(DatePipe);
  }

  showToast(toastMessage, captionval, typeval) {
    this.toaster.open({
      text: toastMessage,
      caption: captionval,
      type: typeval
    });
  }

  public showMessage(contentVal: string, titleVal: string = '', userMessages: Array<string> = null) {
    const dialog: MessageDialogConfig = {
      title: titleVal,
      content: contentVal,
      ok: 'ok'
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '276px',
      data: dialog
    });
  }

  public showConfirmation(
    contentVal: string = 'Are you sure to delete the selected record(s)?',
    titleVal: string = 'Confirmation Message',
    closeVal: string = 'Cancel',
    okVal: string = 'Delete'
  ) {
    const dialog: DialogConfig = {
      title: titleVal,
      content: contentVal,
      close: closeVal,
      ok: okVal
    };
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '276px',
      data: dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOutput(result);
    });
  }

  public dialogOutput(selectedAction) { }

  public getGridData(searchContext: any) {
    this.GridResult = null;
    this.gridData = null;
    this.spinnerService.show();
    if (this.mode !== UserMessages.PageModeEdit) {
      this.selectedRow = null;
    }
    this.service.SearchData(searchContext, this.controllerName).subscribe(
      result => {
        if (result.json().state) {
          this.GridResult = result.json().data;
          this.preLoadGridData(result.json());
          this.postLoadGridData(result.json());
          this.spinnerService.hide();
        } else {
          let errMessage;
          this.spinnerService.hide();
          errMessage = result.json().message.lastUserMessage;
          this.showToast(errMessage, 'Application Warning', 'warning');
        }
        this.loadData();
      },
      errData => {
        this.spinnerService.hide();
      },
    );
  }

  public bindGrid(result) {
    this.GridResult = null;
    if (this.mode !== UserMessages.PageModeEdit) {
      this.selectedRow = null;
    }
    this.message = result.json !== undefined ? result.json().message : result.message;
    if (this.message.status) {
      this.GridResult = result.data ? result.data : result.json().data;
      this.preLoadGridData(result);
      this.loadData();
      this.postLoadGridData(result);
    } else {
      this.showToast(this.message.lastUserMessage, 'Application Error', 'danger');
      this.loadData();
    }
  }

  public postonSelectGridRow(e) { }

  public onSelectGridRow(e) {
    this.changePanSizeToHalf();
    this.setDataItem(e);
    this.postonSelectGridRow(e);
  }

  public getItemData(lstContainer, value): any {
    return value
      ? lstContainer && lstContainer.length > 0
        ? lstContainer.find(i => i.itemValue === value) != null
          ? lstContainer.find(i => i.itemValue === value).itemData
          : ''
        : ''
      : '';
  }

  public getItemValue(lstContainer, data): any {
    return data
      ? lstContainer && lstContainer.length > 0
        ? lstContainer.find(i => i.itemData.toLowerCase().trim() === data.toLowerCase().trim()) != null
          ? lstContainer.find(i => i.itemData.toLowerCase().trim() === data.toLowerCase().trim()).itemValue
          : 0
        : 0
      : 0;
  }

  public onReturn() {
    if (this.mode === UserMessages.PageModeEdit) {
      this.setTogglePanel(true, false);
      this.changePanSizeToHalf();
    } else {
      this.setTogglePanel(false, false);
      this.changePanSizeToMax();
      this.selectedRow = null;
    }
    if (this.entity) {
      this.entity.Flag = 0;
    }
  }

  public preLoadGridData(result: any) { }

  public postLoadGridData(result: any) { }

  loadData(): void {
    this.gridData = new MatTableDataSource();
    if (this.GridResult) {
      this.gridData.data = this.GridResult;
    } else {
      this.gridData = null;
    }
  }

  public changePanSizeToHalf() {
    this.panSize = SpliterConfig.PanSizeHalfHeight;
  }

  public changePanSizeToMax() {
    this.panSize = SpliterConfig.PanSizeMaxHeight;
  }

  public changePanSizeToMin() {
    this.panSize = 10;
  }

  public setDataItem(e) {
    this.selectedRow = e;
    this.entity = e;
  }

  public getGridSelectedRecord(searchContext) {
    this.spinnerService.show();
    this.service.SearchDataForDetail(searchContext, this.controllerName).subscribe(
      result => {
        if (result.json().state) {
          this.entity = result.json().data;
          this.postGetGridSelectRecord();
        } else {
          let errMessage;
          errMessage = result.json().lastUserMessage;
          this.showToast(errMessage, 'Warning', 'warning');
        }
        this.spinnerService.hide();
      },
      function () {
        this.spinnerService.hide();
      }
    );
  }

  postGetGridSelectRecord() { }

  public ondragEnd(data) {
    this.panSize = data[0];
  }

  public setWindowAccessId(globalSettings: any, defaultAdd: boolean = false) {
    this.setButtonPanelAccess(true, true, true);
    this.setTogglePanel(true, false);
  }

  public setButtonPanelAccess(allowAdd, allowEdit, allowDelete) {
    this.buttonPanelAccess.AllowAdd = allowAdd;
    this.buttonPanelAccess.AllowEdit = allowEdit;
    this.buttonPanelAccess.AllowDelete = allowDelete;
  }

  public disableAllButtons() {
    this.buttonPanelAccess.AllowAdd = false;
    this.buttonPanelAccess.AllowEdit = false;
    this.buttonPanelAccess.AllowDelete = false;
  }

  public onClickAddRecord() {
    this.disableAllButtons();
    this.changePanSizeToHalf();
    this.mode = UserMessages.PageModeAdd;
    this.setTogglePanel(true, true);
    this.selectedRow = null;
  }

  public onClickUpdateRecord() {
    if (this.selectedRow) {
      this.disableAllButtons();
      this.mode = UserMessages.PageModeEdit;
      this.setTogglePanel(true, true);
      this.changePanSizeToHalf();
    } else {
      this.showToast(UserMessages.SelectRowFromGrid, 'Warning', 'warning');
    }
  }

  public setTogglePanel(showPanelDetail, showPanelUpdate) {
    this.togglePanel.showPanelDetail = showPanelDetail;
    this.togglePanel.showPanelUpdate = showPanelUpdate;
  }

  public deleteGridSelectedRecord(): void {
    this.spinnerService.show();
    this.service.DeleteByEntity(this.entity, this.controllerName).subscribe(
      result => {
        this.message = result.json();
        if (this.message.state) {
          this.mode = null;
          this.selectedRow = null;
          this.showToast(this.message.lastUserMessage, 'Information', 'success');
          this.postonDeleteGridRow();
        }     
        this.spinnerService.hide();
      },
      function (error) {
        this.spinnerService.hide();
      }
    );
  }

  public postOnInsertUpdate() { }

  public postonDeleteGridRow() { }

  public onClickSaveRecord(newUpdatedEntity, optionalEntity = null) {
    this.disableSaveButton = true;
    this.spinnerService.show();
    this.service.InsertUpdateData(newUpdatedEntity, this.controllerName).subscribe(
      result => {
        this.message = result.json();
        this.disableSaveButton = false;
        if (this.message.state) {
          this.showToast(this.message.lastUserMessage, 'Information', 'success');
          this.postOnInsertUpdate();
        } else {
          let errMessage;
          errMessage = result.json().lastUserMessage;
          this.showToast(errMessage, 'Warning', 'warning');
        }
        this.spinnerService.hide();
      },
      function (error) {
        this.spinnerService.hide();
      }
    );
  }

  close() {
    if (this.mode === UserMessages.PageModeEdit) {
      this.setTogglePanel(false, true);
      this.changePanSizeToHalf();
    } else {
      this.onReturn();
    }
  }

  sortObjects(objArray, properties /*, primers*/) {
    const primers = arguments[2] || {};

    properties = properties.split(/\s*,\s*/).map(function (prop) {
      prop = prop.match(/^([^\s]+)(\s*desc)?/i);
      if (prop[2] && prop[2].toLowerCase() === 'desc') {
        return [prop[1], -1];
      } else {
        return [prop[1], 1];
      }
    });

    function valueCmp(x, y) {
      return x > y ? 1 : x < y ? -1 : 0;
    }

    function arrayCmp(a, b) {
      const arr1 = [];
      const arr2 = [];
      properties.forEach(function (prop) {
        let aValue = a[prop[0]];
        let bValue = b[prop[0]];
        if (typeof primers[prop[0]] !== 'undefined') {
          aValue = primers[prop[0]](aValue);
          bValue = primers[prop[0]](bValue);
        }
        arr1.push(prop[1] * valueCmp(aValue, bValue));
        arr2.push(prop[1] * valueCmp(bValue, aValue));
      });
      return arr1 < arr2 ? -1 : 1;
    }

    objArray.sort(function (a, b) {
      return arrayCmp(a, b);
    });
  }
}
export class TogglePanel {
  showPanelUpdate = false;
  showPanelDetail = false;
}
export class ButtonPanelAccess {
  ApplicationRoleId: number;
  WindowId: number;
  EncruptedWindowId: string;
  AllowAdd = false;
  AllowEdit = false;
  AllowDelete = false;
  AllowReset = false;
  AllowSearch = false;
  AllowCopy = false;
  AllowView = false;
  DisableAdd = false;
  DisableEdit = false;
  DisableDelete = false;
}
export class ItemData {
  ItemValue: number;
  ItemData: string;
}
