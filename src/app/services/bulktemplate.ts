import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class BulkTemplateService {
    constructor() {}

    async generateBulktemplate() {
        // Excel Title, Header, Data
        const title = 'Bulk upload template';
        const header = ['accnumber', 'notemade'];

        // Create workbook and worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Add Row and formatting
        /*const titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };*/
        // worksheet.addRow([]);

        // Add Header Row
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'AED6F1' }, // FFFFFF00 00543D
                bgColor: { argb: 'AED6F1' },
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        const data = ['0000000', 'Note Made'];
        worksheet.addRow(data);
        worksheet.getColumn(4).width = 100;
        worksheet.addRow([]);
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            fs.saveAs(blob, 'Bulk-notes-upload-template.xlsx');
        });
    }

    async generateInsurancetemplate() {
        // Excel Title, Header, Data
        const title = 'Bulk Insurance template';
        const header = [
            'insurancename',
            'physicaladdress',
            'postaladdress',
            'emailaddress',
            'telnumber',
            'contactperson',
        ];

        // Create workbook and worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Add Row and formatting
        /*const titleRow = worksheet.addRow([title]);
titleRow.font = {
  name: 'Comic Sans MS',
  family: 4,
  size: 16,
  underline: 'double',
  bold: true,
};*/
        // worksheet.addRow([]);

        // Add Header Row
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'AED6F1' }, // FFFFFF00 00543D
                bgColor: { argb: 'AED6F1' },
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        const data = [
            '0000000',
            '0000000',
            '0000000',
            '0000000',
            '0000000',
            '0000000',
        ];
        worksheet.addRow(data);
        worksheet.getColumn(4).width = 50;
        worksheet.addRow([]);
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((datas: any) => {
            const blob = new Blob([datas], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            fs.saveAs(blob, 'Bulk-Insurance-upload-template.xlsx');
        });
    }
}
