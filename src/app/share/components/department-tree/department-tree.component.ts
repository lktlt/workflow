import { flatten } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzTreeNodeOptions ,NzTreeNode, NzFormatEmitEvent } from "ng-zorro-antd/tree";
import { count } from 'rxjs/operators';
import { DepartmentService } from 'src/app/core/services/department.service';
import { Department } from "../../../pages/group-manage/model/department";

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.less']
})
export class DepartmentTreeComponent implements OnInit {

  @Output()
  selectedNodeChanged = new EventEmitter<Department[]>();

  @Output()
  loadData = new EventEmitter<NzTreeNodeOptions[]>();

  @Output()
  nodeChecked = new EventEmitter<string>();

  nodes!: NzTreeNodeOptions[];
  data: Department[] = [];
  selectedNode?: NzTreeNode|null;
  constructor(
    private dapartmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.initNodes();
  }
  initNodes() {
    let nodes: NzTreeNodeOptions[] = [{
      title: '组织结构', key: '', icon: 'global', expanded: true, children: [], isLeaf: false
    }]
    this.dapartmentService.getAll().subscribe(
      (result: any) => {
        console.log("dapartments", result);
        this.data = result;
        this.makeNodes(nodes[0], this.data);
        this.nodes = nodes;
        console.log(this.nodes);
        this.loadData.emit(this.nodes);
        this.selectedNodeChanged.emit(this.data.filter(department=>department.upId==this.selectedNode?.key));
      }
    );
  }
  makeNodes(node: NzTreeNodeOptions, departments: Department[], upId?: string) {
    let ms = departments.filter(data => data.upId == upId);
    ms.forEach((e: Department) => {
      let data: NzTreeNodeOptions = { title: e.name, key: e.id, icon: 'appstore', children: [], isLeaf:false };
      this.makeNodes( data, departments,data.key);
      node.children?.push(data);
    })
  }
  treeClick(e: NzFormatEmitEvent) {
    console.log('event',e);
    this.selectedNode = e.keys && e.keys!.length > 0 ? e.node : null;
    let seletedDatas = this.data.filter((department: Department) => { this.selectedNode?.key == department.upId });
    this.selectedNodeChanged.emit(seletedDatas);
    this.nodeChecked.emit(this.selectedNode?.key);
  }

}
