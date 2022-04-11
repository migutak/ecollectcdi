import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    public dataSubject = new BehaviorSubject<number>(0);
    public notesSubject = new BehaviorSubject<number>(0);
    public Subject = new BehaviorSubject<number>(0);
    public reminderSubject = new BehaviorSubject<number>(0);
    public woffstorySubject = new BehaviorSubject<number>(0);
    public guarantorsSubject = new BehaviorSubject<number>(0);
    public contactsSubject = new BehaviorSubject<number>(0);
    public collateralSubject = new BehaviorSubject<number>(0);
    public filesSubject = new BehaviorSubject<number>(0);
    public telesSubject = new BehaviorSubject<number>(0);
    public ptpsSubject = new BehaviorSubject<number>(0);
    public timeSubject = new BehaviorSubject<number>(0);
    public reminderalertsSubject = new BehaviorSubject<any>(0);
    public accountplanSubject = new BehaviorSubject<any>('NONE');

    constructor() {}

    getTestData(): Observable<any> {
        return this.dataSubject.asObservable();
    }

    getReminderalert(): Observable<any> {
        return this.reminderalertsSubject.asObservable();
    }

    getTimeData(): Observable<any> {
        return this.timeSubject.asObservable();
    }

    getNotesData(): Observable<any> {
        return this.notesSubject.asObservable();
    }

    getReminderData(): Observable<any> {
        return this.reminderSubject.asObservable();
    }
    getAccountPlanData(): Observable<any> {
        return this.accountplanSubject.asObservable();
    }

    getWoffstoryData(): Observable<any> {
        return this.woffstorySubject.asObservable();
    }

    getCollateral(): Observable<any> {
        return this.collateralSubject.asObservable();
    }

    getContacts(): Observable<any> {
        return this.contactsSubject.asObservable();
    }

    getGuarantors(): Observable<any> {
        return this.guarantorsSubject.asObservable();
    }

    getFiles(): Observable<any> {
        return this.filesSubject.asObservable();
    }

    getTeles(): Observable<any> {
        return this.telesSubject.asObservable();
    }

    getPtps(): Observable<any> {
        return this.ptpsSubject.asObservable();
    }

    pustPtpData(dataToPush: number): void {
        this.dataSubject.next(dataToPush);
    }

    pustNotesData(dataToPush: number): void {
        this.notesSubject.next(dataToPush);
    }

    pushReminderData(dataToPush: number): void {
        this.reminderSubject.next(dataToPush);
    }
    pushAccountPlanData(plan: string): void {
        this.accountplanSubject.next(plan);
    }

    pushReminderAlertData(dataToPush: any): void {
        this.reminderalertsSubject.next(dataToPush);
    }

    pushWoffstoryData(dataToPush: number): void {
        this.woffstorySubject.next(dataToPush);
    }

    pushContacts(dataToPush: number): void {
        this.contactsSubject.next(dataToPush);
    }

    pushReminder(dataToPush: number): void {
        this.reminderSubject.next(dataToPush);
    }

    pushGuarantors(dataToPush: number): void {
        this.guarantorsSubject.next(dataToPush);
    }

    pushCollateral(dataToPush: number): void {
        this.collateralSubject.next(dataToPush);
    }

    pushFile(totalFiles: number): void {
        this.filesSubject.next(totalFiles);
    }

    pushTeles(totalTeles: number): void {
        this.telesSubject.next(totalTeles);
    }

    pushPtps(totalPtps: number): void {
        this.ptpsSubject.next(totalPtps);
    }
}

// services
