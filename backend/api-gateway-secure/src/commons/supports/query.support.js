module.exports = {
  buildDynamicUpdateQuery(tableName, updates, conditions) {
    
    const updatePairs = Object.keys(updates)
      .map((key, index) => `${key}=:update${index}`)
      .join(', ');
  
    const updateValues = Object.values(updates).reduce((acc, value, index) => {
      acc[`update${index}`] = value;
      return acc;
    }, {});
  
    const conditionPairs = Object.keys(conditions)
      .map((key, index) => `${key}=:condition${index}`)
      .join(' AND ');
  
    const conditionValues = Object.values(conditions).reduce((acc, value, index) => {
      acc[`condition${index}`] = value;
      return acc;
    }, {});
  
    const allValues = { ...updateValues, ...conditionValues };
  
    const query = `
      UPDATE ${tableName}
      SET ${updatePairs}
      WHERE ${conditionPairs}
      RETURNING *;
    `;
  
    return { query, allValues };
  }
}
