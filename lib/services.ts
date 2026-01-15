// lib/services.ts
export const services = [
  {
    slug: "corporate-services",
    title: "Corporate Services",
    description: "Incorporation of company. Consultancy on Company Law.",
    details: "We provide comprehensive corporate services including company registration, ROC filings, secretarial compliance, board meetings, share transfers, and advisory on corporate governance. Our experts ensure seamless compliance with the Companies Act and related regulations.",
    img: "/cp-service.jfif",
  },
  {
    slug: "accounting-services",
    title: "Accounting Services",
    description: "MIS Reports. Financial Analysis. Asset Accounting Management.",
    details: "Professional bookkeeping, preparation of financial statements, management information systems (MIS), budgeting, forecasting, and fixed asset management. We help businesses maintain accurate books and derive meaningful insights from financial data.",
    img: "/A-service.jfif",
  },
  {
    slug: "income-tax",
    title: "Income Tax",
    description: "Consultancy on various intricate matters pertaining to Income tax.",
    details: "Expert guidance on tax planning, filing of ITRs, TDS compliance, tax assessments, appeals, advance tax calculations, and representation before tax authorities. We minimize your tax liability while ensuring full compliance.",
    img: "/inco-servive.png",
  },
  {
    slug: "audit-services",
    title: "Audit Services",
    description: "Indepth study of existing systems, procedures and controls for proper management.",
    details: "Statutory audits, tax audits, internal audits, stock audits, and concurrent audits. Our thorough approach identifies risks, improves internal controls, and provides valuable recommendations for operational efficiency.",
    img: "/As.jfif",
  },
  {
    slug: "corporate-finance",
    title: "Corporate Finance",
    description: "Preparations of Project Reports. Preparation of CMA data for financial institutions.",
    details: "Detailed project reports, financial modeling, CMA data preparation for bank loans, working capital assessment, term loan appraisals, and fundraising advisory. We help secure funding on the best terms.",
    img: "/cop-fin.png",
  },
  {
    slug: "gst",
    title: "GST",
    description: "GST Migrations and Registrations. Filing of GST Returns.",
    details: "GST registration, migration from VAT/Service Tax, monthly/quarterly return filing (GSTR-1, GSTR-3B), input tax credit reconciliation, GST audits, and compliance advisory. Stay hassle-free with our end-to-end GST solutions.",
    img: "/gst-service.jfif",
  },
];

export type Service = typeof services[0];