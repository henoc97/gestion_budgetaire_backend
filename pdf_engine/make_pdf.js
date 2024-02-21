const PDFDocument = require('pdfkit');
const fs = require('fs');

// Créer un nouveau document PDF
const doc = new PDFDocument();

// Définir les marges et la largeur de la page
const margin = 50;
const pageWidth = 600;

// Fonction pour créer un tableau
function createTable(data, startY) {
  const cellPadding = 10;
  const fontSize = 12;
  const rowHeight = fontSize + cellPadding * 2;

  // Définir la position de départ du tableau
  let y = startY;

  // Dessiner les lignes de titre
  doc.rect(margin, y, pageWidth - margin * 2, rowHeight).fill('#cccccc');
  doc.font('Helvetica-Bold').fontSize(fontSize).fill('black');
  doc.text('Catégorie', margin + cellPadding, y + cellPadding);
  doc.text('Budget', margin + 150 + cellPadding, y + cellPadding);
  doc.text('Dépenses', margin + 300 + cellPadding, y + cellPadding);
  doc.text('Restant', margin + 450 + cellPadding, y + cellPadding);

  // Dessiner les lignes de données
  y += rowHeight;
  data.forEach((row, index) => {
    doc.rect(margin, y, pageWidth - margin * 2, rowHeight).fill(index % 2 === 0 ? '#f0f0f0' : '#ffffff');
    doc.font('Helvetica').fontSize(fontSize).fill('black');
    doc.text(row.category, margin + cellPadding, y + cellPadding);
    doc.text(row.budget, margin + 150 + cellPadding, y + cellPadding);
    doc.text(row.dépenses, margin + 300 + cellPadding, y + cellPadding);
    doc.text(row.restant, margin + 450 + cellPadding, y + cellPadding);
    y += rowHeight;
  });

  // Retourner la position y de la fin du tableau
  return y;
}

// Ajouter du contenu au document
doc.fontSize(25)
   .text('Rapport Financier', { align: 'center' })
   .moveDown();

// Tableau des budgets
const budgets = [
    { category: 'Alimentation', budget: '$500', dépenses: '$400', restant: '$100' },
    { category: 'Logement', budget: '$1000', dépenses: '$900', restant: '$100' },
    // Ajoutez d'autres lignes de budget ici
];

const tableStartY = 150;
const tableEndY = createTable(budgets, tableStartY);

// Enregistrer le document dans un fichier
doc.pipe(fs.createWriteStream('rapport_financier.pdf'));
doc.end();

console.log('Le fichier PDF du rapport financier a été généré avec succès.');
