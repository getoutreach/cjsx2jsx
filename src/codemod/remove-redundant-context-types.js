export default function transformer(file, api) {
  const j = api.jscodeshift;
  
  const classPropertyCopiedFromAssignment = (propertyName, copiedFrom) => ({
    type: "AssignmentExpression",
    operator: '=', 
    left: {
      type: "MemberExpression",
      object: { type: "ThisExpression" },
      property: { type: "Identifier", name: propertyName }
    },
    right: {
      type: "MemberExpression",
      object: { type: "Identifier", name: copiedFrom },
      property: { type: "Identifier", name: propertyName }
    }
  });
  
  return j(file.source).find(j.ClassDeclaration)
    .filter(path => path.node.superClass)
    .forEach(path => {
      const superClass = path.node.superClass.name;
    
      const removeNodeAtPath = path => {
        j(path).replaceWith();
      };
    
      const initClass = j(path).find(j.MethodDefinition, {
        static: true,
        key: { name: 'initClass' }
      });
    
      initClass.find(j.ExpressionStatement, {
        expression: classPropertyCopiedFromAssignment('contextTypes', superClass)
      })
      .forEach(removeNodeAtPath);

      initClass.find(j.ExpressionStatement, {
        expression: classPropertyCopiedFromAssignment('childContextTypes', superClass)
      })
      .forEach(removeNodeAtPath);
      
    })
    .toSource();
}
