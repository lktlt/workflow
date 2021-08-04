import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManageComponent } from './roles-manage.component';

describe('RolesManageComponent', () => {
  let component: RolesManageComponent;
  let fixture: ComponentFixture<RolesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
