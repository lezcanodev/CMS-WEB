import {http} from 'msw';


/**
 * Aquí debería interceptar las solicitudes al backend y falsear las respuestas
*/
export const handlers = [
  // Mocking a GET request
  http.delete('/api/borrar-categoria/:paramId', (req, res, ctx) => {
    const { paramId } = req.params;
    console.log(req, res, ctx);
    // You can use paramId here to perform any logic you need
    console.log(`Deleting category with ID: ${paramId}`);

    return res(ctx.status(200), ctx.json({ message: `Category ${paramId} deleted successfully.` }));
  }),


];