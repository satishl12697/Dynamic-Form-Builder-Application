import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

// Interface representing a form field
interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  // List of fields that user can drag into form editor
  availableFields: FormField[] = [
    { id: '1', type: 'text', label: 'Single Line Text', required: false },
    { id: '2', type: 'textarea', label: 'Multi Line Text', required: false },
    {
      id: '3',
      type: 'dropdown',
      label: 'Dropdown',
      required: false,
      options: ['Option 1', 'Option 2'],
    },
    {
      id: '4',
      type: 'checkbox',
      label: 'Checkbox Group',
      required: false,
      options: ['Check 1', 'Check 2'],
    },
    {
      id: '5',
      type: 'radio',
      label: 'Radio Group',
      required: false,
      options: ['Radio 1', 'Radio 2'],
    },
    { id: '6', type: 'date', label: 'Date Picker', required: false },
  ];

  // The form fields currently added to the form editor
  formFields: FormField[] = [];

  // The reactive form instance that powers the form preview and submission
  previewForm: FormGroup = this.fb.group({});
  formName: string = 'My Custom Form';

  // Inject FormBuilder to create reactive forms
  constructor(public fb: FormBuilder, private formService: FormService) { }

  ngOnInit() { }

  drop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within formFields list
      moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    } else {
      // Adding a new field from availableFields to formFields

      const draggedField = event.previousContainer.data[event.previousIndex];

      // Generate a safe and unique id for the formControlName using the label
      const baseId = draggedField.label
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w]/g, '');

      let uniqueId = baseId;
      let counter = 1;

      // Ensure ID uniqueness in formFields to avoid duplicate formControlNames
      while (this.formFields.find(f => f.id === uniqueId)) {
        uniqueId = `${baseId}_${counter++}`;
      }

      // Clone the dragged field and assign the unique ID
      const newField = {
        ...draggedField,
        id: uniqueId,
      };

      // Insert the new field into formFields at the drop position
      this.formFields.splice(event.currentIndex, 0, newField);
    }

    // After any change, rebuild the reactive form controls to reflect current fields
    this.buildPreviewForm();
  }


  // Removes a form field at a specified index

  removeField(index: number) {
    this.formFields.splice(index, 1);
    this.buildPreviewForm();
  }

  /**
   * Dynamically builds the FormGroup based on current formFields
   * Adds required validators if field.required is true
   */
  buildPreviewForm() {
    const group: any = {};

    this.formFields.forEach((field) => {
      if (field.type === 'checkbox' && field.options) {
        const checkboxGroup: any = {};
        field.options.forEach(opt => checkboxGroup[opt] = this.fb.control(false));
        group[field.id] = this.fb.group(checkboxGroup);
      } else {
        group[field.id] = field.required ? ['', Validators.required] : [''];
      }
    });

    this.previewForm = this.fb.group(group);
  }

  /**
   * Called when the user submits the preview form
   * Checks form validity and alerts the submitted form values
   */

  submitForm() {
    if (this.previewForm.valid) {
      const submission = {
        formId: "",
        data: this.previewForm.value,
        submittedAt: new Date()
      };
      this.formService.submitForm(submission).subscribe(() => {
        alert('Form submitted and saved successfully!');
      });
    } else {
      alert('Form is invalid.');
    }
  }






  saveForm() {
    if (!this.formName.trim()) {
      alert('Please enter a form name before saving.');
      return;
    }
    const formData = { name: this.formName, fields: this.formFields };
    this.formService.saveForm(formData).subscribe({
      next: () => alert('Form saved successfully!'),
      error: () => alert('Error saving form.'),
    });

  }
}
