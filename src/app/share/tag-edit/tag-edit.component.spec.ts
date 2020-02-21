import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagEditComponent } from './tag-edit.component';

describe('TagEditComponent', () => {
  let component: TagEditComponent;
  let fixture: ComponentFixture<TagEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagEditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});