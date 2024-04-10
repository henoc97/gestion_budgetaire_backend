
const {upload} = require('../file_saver/config_file');



module.exports.upload_file = upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été envoyé' });
        }

        const { filename, mimetype, size } = req.file;
        const { meta1, meta2 } = req.body; // Supposons que vous envoyez les métadonnées "meta1" et "meta2" depuis le frontend
        console.log(filename, mimetype, size);
        console.log(meta1, meta2);
        // Insérer les métadonnées et les détails du fichier dans la base de données
        //const result = await pool.query('INSERT INTO files (filename, mimetype, size, meta1, meta2) VALUES ($1, $2, $3, $4, $5) RETURNING *', [filename, mimetype, size, meta1, meta2]);
        
        res.json({ message: 'Fichier uploadé avec succès', file: { filename, mimetype, size, meta1, meta2 } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la demande' });
    }
};
