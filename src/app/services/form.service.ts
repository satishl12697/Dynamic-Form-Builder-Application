import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    // Save form definition
    saveForm(formData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/forms`, formData);
    }

    // Get all forms
    getForms(): Observable<any> {
        return this.http.get(`${this.baseUrl}/forms`);
    }

    // Get forms by ID
    getFormById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/forms/${id}`);
    }

    // Submit form data (user submission)
    submitForm(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/submissions`, data);
    }

    // Get submissions (admin or user can fetch)
    getSubmissions(): Observable<any> {
        return this.http.get(`${this.baseUrl}/submissions`);
    }
}
