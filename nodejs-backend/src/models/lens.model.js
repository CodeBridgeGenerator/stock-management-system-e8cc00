
    module.exports = function (app) {
        const modelName = 'lens';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            lensname: { type: String, required: true, unique: true, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
price: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
availablestockquantity: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
brandid: { type: Schema.Types.ObjectId, ref: "brands" },
categoryid: { type: Schema.Types.ObjectId, ref: "categories" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };