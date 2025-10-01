export const GET = async (request: Request): Promise<Response> => {
  return Response.json(
    { status: 'ok' },
    { status: 200 }
  );
};
