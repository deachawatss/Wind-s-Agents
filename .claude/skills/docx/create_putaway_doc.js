const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, TableOfContents, LevelFormat, PageBreak } = require('docx');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

function createCell(text, options = {}) {
    const { width = 4680, bold = false, centered = false, shaded = false } = options;
    return new TableCell({
        borders: cellBorders,
        width: { size: width, type: WidthType.DXA },
        shading: shaded ? { fill: "D5E8F0", type: ShadingType.CLEAR } : undefined,
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({
            alignment: centered ? AlignmentType.CENTER : AlignmentType.LEFT,
            children: [new TextRun({ text, bold, size: 22 })]
        })]
    });
}

function createCodeBlock(code) {
    return new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
            text: code,
            font: "Consolas",
            size: 18,
            color: "333333"
        })]
    });
}

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            { id: "Title", name: "Title", basedOn: "Normal",
                run: { size: 56, bold: true, color: "000000", font: "Arial" },
                paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
            { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 32, bold: true, color: "000000", font: "Arial" },
                paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
            { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 28, bold: true, color: "000000", font: "Arial" },
                paragraph: { spacing: { before: 180, after: 180 }, outlineLevel: 1 } },
            { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 24, bold: true, color: "333333", font: "Arial" },
                paragraph: { spacing: { before: 120, after: 120 }, outlineLevel: 2 } }
        ]
    },
    numbering: {
        config: [
            { reference: "bullet-list",
                levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
            { reference: "numbered-list-1",
                levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
        ]
    },
    sections: [{
        properties: {
            page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }
        },
        children: [
            // Title Page
            new Paragraph({
                heading: HeadingLevel.TITLE,
                children: [new TextRun("Putaway BME Scenarios")]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 120, after: 480 },
                children: [new TextRun({ text: "Documentation", size: 28 })]
            }),
            new Paragraph({ children: [new PageBreak()] }),

            // Table of Contents
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Table of Contents")]
            }),
            new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
            new Paragraph({ children: [new PageBreak()] }),

            // Overview
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Overview")]
            }),
            new Paragraph({
                children: [new TextRun("This document describes the various scenarios that can occur in the old Putaway BME (Bin-to-Bin Transfer) module, focusing on lot-controlled items. The Putaway module allows transferring inventory from one bin to another within the same location.")]
            }),

            // Prerequisites
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Prerequisites")]
            }),
            new Paragraph({
                children: [new TextRun("To be available on this screen, the item must be:")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("A Multiple Bins item, OR")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("A Lot/Serial Tracked item with the option \"Multiple Bins Required\" checked on the Item Master screen")]
            }),
            new Paragraph({
                spacing: { before: 120 },
                children: [new TextRun("Data must be maintained at:")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("Item Location (INLOC)")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("Bin Master (Binmaster)")]
            }),

            // Two Transfer Options
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("The Two Transfer Options")]
            }),
            new Paragraph({
                children: [new TextRun("When processing a bin transfer, the system shows the \"Select Committed Transaction\" window with two options:")]
            }),
            createCodeBlock("flowchart LR\n    A[Process Button Clicked] --> B{Select Committed\nTransaction Window}\n    B --> C[Option 1:\nTransfer Committed Qty]\n    B --> D[Option 2:\nTransfer from Available Qty]\n    C --> E[Move selected commitments\nWITH the inventory]\n    D --> F[Keep commitments in source bin\nMove only available qty]"),

            // Option 1
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Option 1: Transfer Committed Qty")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Purpose: ", bold: true }), new TextRun("Transfer selected commitment(s) along with the transfer quantity")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Use Case: ", bold: true }), new TextRun("When you want to move both inventory AND its associated work orders to the new bin")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Result: ", bold: true }), new TextRun("Commitments move to destination bin")]
            }),

            // Option 2
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Option 2: Transfer from Available Qty")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Purpose: ", bold: true }), new TextRun("Transfer only from available quantity (QtyOnHand - QtyCommitSales)")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Use Case: ", bold: true }), new TextRun("When you want to leave committed inventory behind for existing work orders")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Result: ", bold: true }), new TextRun("Source bin retains quantity to fulfill remaining commitments")]
            }),
            new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [new TextRun({ text: "IMPORTANT: ", bold: true, color: "FF0000" }), new TextRun({ text: " If transfer quantity is equal to available quantity, the system will display an error message. Transfer quantity must be less than available quantity when using Transfer from Available Qty.", color: "FF0000" })]
            }),

            // Database Schema
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Database Schema Overview")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Key Tables")]
            }),
            createCodeBlock("erDiagram\n    LotMaster ||--o{ LotTransaction : \"has\"\n    LotMaster ||--o{ QCLotTransaction : \"has QC\"\n    LotMaster }o--|| Binmaster : \"stored in\"\n    LotMaster }o--|| LotStatus : \"has status\""),

            // Transaction Types Table
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Transaction Types")]
            }),
            new Table({
                columnWidths: [1200, 3500, 4680],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Code", { width: 1200, bold: true, centered: true, shaded: true }),
                            createCell("Type Name", { width: 3500, bold: true, centered: true, shaded: true }),
                            createCell("Description", { width: 4680, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("1"), createCell("Purchase Receipt"), createCell("Receiving inventory from PO")] }),
                    new TableRow({ children: [createCell("2"), createCell("Purchase Return"), createCell("Return to vendor")] }),
                    new TableRow({ children: [createCell("3"), createCell("Sales Issue"), createCell("Issue for sales order")] }),
                    new TableRow({ children: [createCell("4"), createCell("Sales Return"), createCell("Customer return")] }),
                    new TableRow({ children: [createCell("5"), createCell("Mfg. Issue", { bold: true }), createCell("Issue for manufacturing")] }),
                    new TableRow({ children: [createCell("6"), createCell("Mfg. Return"), createCell("Return from manufacturing")] }),
                    new TableRow({ children: [createCell("7"), createCell("Inventory Transfer"), createCell("Transfer between locations")] }),
                    new TableRow({ children: [createCell("8"), createCell("Inventory Adj. Positive", { bold: true }), createCell("Used for destination bin in putaway")] }),
                    new TableRow({ children: [createCell("9"), createCell("Inventory Adj. Negative", { bold: true }), createCell("Used for source bin in putaway")] }),
                    new TableRow({ children: [createCell("10"), createCell("Damaged"), createCell("Damaged inventory")] }),
                    new TableRow({ children: [createCell("11"), createCell("Warehouse Move In"), createCell("Move into warehouse")] }),
                    new TableRow({ children: [createCell("12"), createCell("Warehouse Move Out"), createCell("Move out of warehouse")] }),
                    new TableRow({ children: [createCell("17"), createCell("Move"), createCell("Bin-to-bin move")] }),
                    new TableRow({ children: [createCell("21"), createCell("Sales Provisional"), createCell("Provisional sales allocation")] })
                ]
            }),

            // Quantity Calculations
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Quantity Calculations")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Available Quantity Formula")]
            }),
            createCodeBlock("Available Qty = QtyOnHand - QtyCommitSales"),
            new Paragraph({
                children: [new TextRun("Where:")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "QtyOnHand: ", bold: true }), new TextRun("Total physical quantity in the bin")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "QtyCommitSales: ", bold: true }), new TextRun("Sum of pending (unprocessed) commitments")]
            }),

            // Example Scenario
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Example: Lot 2603432 at K0900-1B")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Current State")]
            }),
            new Table({
                columnWidths: [2340, 2340, 4680],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Field", { width: 2340, bold: true, centered: true, shaded: true }),
                            createCell("Value", { width: 7020, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("QtyOnHand"), createCell("4,300")] }),
                    new TableRow({ children: [createCell("QtyCommitSales"), createCell("3,000")] }),
                    new TableRow({ children: [createCell("Available Qty", { bold: true }), createCell("1,300", { bold: true })] }),
                    new TableRow({ children: [createCell("Pending Transactions"), createCell("63 records (mostly Mfg. Issue)")] }),
                    new TableRow({ children: [createCell("Actual Commitment Sum"), createCell("2,925")] })
                ]
            }),

            // Lot Distribution Table
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Lot Distribution Across Bins")]
            }),
            new Table({
                columnWidths: [1600, 1400, 1800, 1400, 2800],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Bin", { width: 1600, bold: true, centered: true, shaded: true }),
                            createCell("QtyOnHand", { width: 1400, bold: true, centered: true, shaded: true }),
                            createCell("QtyCommitSales", { width: 1800, bold: true, centered: true, shaded: true }),
                            createCell("Available", { width: 1400, bold: true, centered: true, shaded: true }),
                            createCell("Status", { width: 2800, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("K0900-1A"), createCell("800"), createCell("800"), createCell("0"), createCell("C")] }),
                    new TableRow({ children: [createCell("K0900-1B"), createCell("4,300"), createCell("3,000"), createCell("1,300"), createCell("C")] }),
                    new TableRow({ children: [createCell("LDNPN"), createCell("2,375"), createCell("0"), createCell("2,375"), createCell("C")] }),
                    new TableRow({ children: [createCell("PWBB-12"), createCell("1,928"), createCell("1,912"), createCell("16"), createCell("C")] }),
                    new TableRow({ children: [createCell("T1101-3A"), createCell("300"), createCell("0"), createCell("300"), createCell("B")] }),
                    new TableRow({ children: [createCell("T1109-1B"), createCell("1,225"), createCell("0"), createCell("1,225"), createCell("B")] }),
                    new TableRow({ children: [createCell("T1203-1B"), createCell("1,225"), createCell("0"), createCell("1,225"), createCell("B")] }),
                    new TableRow({ children: [createCell("T1207-1B"), createCell("1,225"), createCell("0"), createCell("1,225"), createCell("B")] }),
                    new TableRow({ children: [createCell("T1209-2B"), createCell("1,225"), createCell("0"), createCell("1,225"), createCell("B")] }),
                    new TableRow({ children: [createCell("WHINF"), createCell("225"), createCell("0"), createCell("225"), createCell("B")] })
                ]
            }),

            // Lot Status Codes
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Lot Status Codes")]
            }),
            new Table({
                columnWidths: [1200, 3500, 4680],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Code", { width: 1200, bold: true, centered: true, shaded: true }),
                            createCell("Description", { width: 3500, bold: true, centered: true, shaded: true }),
                            createCell("Department", { width: 4680, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("B", { bold: true }), createCell("Block (Temporary Hold)", { bold: true }), createCell("WHD")] }),
                    new TableRow({ children: [createCell("C", { bold: true }), createCell("Confirmed", { bold: true }), createCell("WHD")] }),
                    new TableRow({ children: [createCell("D"), createCell("Damaged"), createCell("WHD")] }),
                    new TableRow({ children: [createCell("E"), createCell("Expired"), createCell("WHD")] }),
                    new TableRow({ children: [createCell("P"), createCell("Pending (Waiting for Approval)"), createCell("QC")] }),
                    new TableRow({ children: [createCell("Q"), createCell("Quarantine"), createCell("QC")] }),
                    new TableRow({ children: [createCell("R"), createCell("Rejected"), createCell("QC")] }),
                    new TableRow({ children: [createCell("S"), createCell("Sample"), createCell("QC")] }),
                    new TableRow({ children: [createCell("T"), createCell("Testing (Waiting for External LAB)"), createCell("QC")] }),
                    new TableRow({ children: [createCell("W"), createCell("Write Off"), createCell("PPC")] }),
                    new TableRow({ children: [createCell("Y"), createCell("Year End Stock Count"), createCell("WHD")] })
                ]
            }),

            // Putaway Scenarios
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Putaway Scenarios")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 0: Immediate Transfer (No Commitments)")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("QtyCommitSales = 0, no pending commitments exist.")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Example: ", bold: true }), new TextRun("Bin T1109-1B has QtyOnHand = 1,225 and QtyCommitSales = 0")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Process")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Select source Lot/Bin")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Enter transfer quantity")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Select destination bin")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Transfer executes immediately", bold: true }), new TextRun(" - no commitment selection screen")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("System creates Type 9 and Type 8 transactions")]
            }),

            // Scenario 1
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 1: Transfer Available Qty Only")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("User wants to transfer quantity that is fully available (no commitments).")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Process")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Select source Lot/Bin (e.g., K0900-1B)")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Enter transfer quantity ≤ Available Qty (e.g., 1,300)")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("Select destination bin")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("System creates:")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Type 9 (Inv Adj Negative)", bold: true }), new TextRun(" transaction at source bin")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Type 8 (Inv Adj Positive)", bold: true }), new TextRun(" transaction at destination bin")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Result")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Source: ", bold: true }), new TextRun("QtyOnHand decreases, QtyCommitSales unchanged")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Destination: ", bold: true }), new TextRun("QtyOnHand increases")]
            }),

            // Scenario 2
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 2: Transfer with Committed Qty")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("User wants to transfer quantity that exceeds Available Qty.")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Example: ", bold: true }), new TextRun("K0900-1B has 4,300 QtyOnHand but only 1,300 Available. User wants to transfer 2,000.")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Process")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("System detects transfer exceeds Available Qty")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "System shows commitment selection list", bold: true })]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("User selects which commitments to move with the inventory")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun("System:")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("Creates "), new TextRun({ text: "Type 9", bold: true }), new TextRun(" transaction at source")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun("Creates "), new TextRun({ text: "Type 8", bold: true }), new TextRun(" transaction at destination")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Updates QtyCommitSales", bold: true }), new TextRun(" at source (decreases)")]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "Creates corresponding commitment records", bold: true }), new TextRun(" at destination")]
            }),

            // Scenario 3-6
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 3: Transfer Entire Bin Contents")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("Moving all inventory from one bin to another.")]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 4: Transfer to Existing Lot/Bin")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("Destination bin already has the same Lot.")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Example: ", bold: true }), new TextRun("Lot 2603432 exists at LDNPN with QtyOnHand = 375")]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 5: Transfer to New Bin")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("Destination bin doesn't have this lot yet.")]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Scenario 6: Blocked Lot Status")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "Condition: ", bold: true }), new TextRun("Lot has LotStatus = 'B' (Blocked).")]
            }),

            // SQL Flow
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("SQL Flow During Transfer")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Step 1: Load Available Bins")]
            }),
            createCodeBlock("SELECT BinNo, Location, Description \nFROM BinMaster \nWHERE Location = 'TFC1' AND BinNo <> 'K0900-1B'"),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Step 2: Get Lot Details")]
            }),
            createCodeBlock("SELECT a.DateExpiry, a.DateReceived, a.QtyOnHand, \n       b.Seriallotflg, b.stockuomCode \nFROM Lotmaster a \nINNER JOIN inmast b ON a.itemkey = b.itemKey\nWHERE a.binNo = 'K0900-1B' \nAND a.locationKey = 'TFC1'\nAND a.itemKey = 'INSALT02' \nAND a.lotNo = '2603432'"),

            // Summary
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Summary of Key Points")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Available Qty", bold: true }), new TextRun(" = QtyOnHand - QtyCommitSales")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Commitments", bold: true }), new TextRun(" are pending transactions (Processed = 'N' or 'P')")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Putaway transfer", bold: true }), new TextRun(" uses Type 9 (negative) and Type 8 (positive)")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Commitment list", bold: true }), new TextRun(" shows items you can optionally transfer with inventory")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "PNITEM", bold: true }), new TextRun(" stores manufacturing work order details that reference lots")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Two options", bold: true }), new TextRun(": \"Transfer Committed Qty\" vs \"Transfer from Available Qty\"")]
            }),
            new Paragraph({
                numbering: { reference: "numbered-list-1", level: 0 },
                children: [new TextRun({ text: "Immediate transfer", bold: true }), new TextRun(" occurs when QtyCommitSales = 0 (no commitments)")]
            }),

            // Screen Fields Reference
            new Paragraph({ children: [new PageBreak()] }),
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("Appendix: Screen Fields Reference")]
            }),
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Bin Transfer Screen Fields")]
            }),
            new Table({
                columnWidths: [3000, 6360],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Field", { width: 3000, bold: true, centered: true, shaded: true }),
                            createCell("Description", { width: 6360, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("Item Key"), createCell("The item associated with this bin transfer")] }),
                    new TableRow({ children: [createCell("Location Key"), createCell("The location (defaults when item location selected)")] }),
                    new TableRow({ children: [createCell("Lot No"), createCell("Lot number stored in the selected source bin")] }),
                    new TableRow({ children: [createCell("Container No"), createCell("Container containing the lot (if \"Allows Containerization\" checked)")] }),
                    new TableRow({ children: [createCell("Bin No From"), createCell("Source bin from which material will be transferred")] }),
                    new TableRow({ children: [createCell("Bin No To"), createCell("Destination bin to which material will be transferred")] }),
                    new TableRow({ children: [createCell("Qty OnHand"), createCell("Quantity available in the selected source bin")] }),
                    new TableRow({ children: [createCell("Qty To Issue"), createCell("Quantity to be transferred to another bin")] })
                ]
            }),

            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("Screen Buttons")]
            }),
            new Table({
                columnWidths: [3000, 6360],
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("Button", { width: 3000, bold: true, centered: true, shaded: true }),
                            createCell("Action", { width: 6360, bold: true, centered: true, shaded: true })
                        ]
                    }),
                    new TableRow({ children: [createCell("Select Bins"), createCell("Opens lookup to select source bin")] }),
                    new TableRow({ children: [createCell("Delete Line"), createCell("Deletes the selected row")] }),
                    new TableRow({ children: [createCell("Insert Bin To for Selected Lines"), createCell("Enter destination bin for multiple selected lines")] }),
                    new TableRow({ children: [createCell("Process"), createCell("Processes the bin transfer, shows commitment selection window")] })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Putaway-BME-Scenarios.docx", buffer);
    console.log("Document created successfully: Putaway-BME-Scenarios.docx");
});
