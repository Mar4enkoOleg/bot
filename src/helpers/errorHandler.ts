// import ApiError from './ApiError';
// import Res from './Response';

// //  function (
// //   err: Error,
// //   req: Request,
// //   res: Response,
// //   next: Function
// // ) {
// //   if (err instanceof ApiError) {
// //     return res.status(err.status).json({ message: err.message });
// //   }
// //   return res.status(500).json({ message: 'Internal error' });
// // }

// export default function errorhandler (err, _, res, next) : Promise<any>{
//   const { status, message } = err;
//   if (status === statusCode.ERROR) return Res.BadRequest(res, message);
//   if (status === HttpCode.BAD_REQUEST) return Res.BadRequest(res, message);

//   Res.InternalError(res, message);
// })

// ((err, _, res, next) => {
//   const { status, message } = err;
//   if (status === statusCode.ERROR) return Res.BadRequest(res, message);
//   if (status === HttpCode.BAD_REQUEST) return Res.BadRequest(res, message);

//   Res.InternalError(res, message);
// }) as ErrorRequestHandler);
