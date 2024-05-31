
    module.exports = function (app) {
        const modelName = 'inventory_transactions';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            transactionDate: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
quantityChange: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
transactionType: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
lens: { type: Schema.Types.ObjectId, ref: "lens" },

            
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