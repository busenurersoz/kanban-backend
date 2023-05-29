import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  STAGE: Joi.string().valid('dev', 'prod').default('dev'),
  MONGODB_URI: Joi.string().default(
    // 'mongodb://localhost:27017/kanban-project-management',
    // 'mongodb+srv://hadimsm:mAcJ5U53tbztTs9k@cluster0.w9is9jl.mongodb.net/kanban-project-management',
    'mongodb+srv://nurbusenur99:vB04nbZYNz2GnWRH@cluster0.dpefruy.mongodb.net/kanban-project-management'
    // 'mongodb://localhost:27017/kanban-management-tool?retryWrites=false&?w=1&retryWrites=true'
  ),
});
