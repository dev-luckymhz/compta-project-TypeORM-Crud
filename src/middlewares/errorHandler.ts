import { Request, Response, NextFunction } from 'express';
interface ErrorResponse extends Error {
    status?: number;
}

// Middleware pour la gestion des erreurs
export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    // Définir un statut par défaut
    const statusCode = err.status || 500;
    // Définir un message d'erreur par défaut
    const message = err.message || 'Internal Server Error';

    // Log des détails de l'erreur pour le débogage (optionnel)
    console.error(err.stack);

    // Réponse JSON avec le statut et le message d'erreur
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
};
