import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.css']
})
export class FormViewerComponent implements OnInit {

  formId: string = '';
  formData: any;
  userForm: FormGroup = this.fb.group({});
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('id') || '';
    if (this.formId) {
      this.formService.getFormById(this.formId).subscribe((form) => {
        this.formData = form;
        this.buildForm(form.fields);
        this.loading = false;
      });
    }
  }

  buildForm(fields: any[]) {
    const group: any = {};
    fields.forEach((field) => {
      group[field.id] = field.required ? ['', Validators.required] : [''];
    });
    this.userForm = this.fb.group(group);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const submission = {
        formId: this.formId,
        data: this.userForm.value,
        submittedAt: new Date()
      };
      this.formService.submitForm(submission).subscribe(() => {
        alert('Form submitted!');
      });
    } else {
      alert('Form is invalid.');
    }
  }

}
