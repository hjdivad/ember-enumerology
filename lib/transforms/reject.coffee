reject = Enumerology.Transform.extend
  apply: (target, collection)->
    collection.reject(@get('callback'), @getWithDefault('target', target))

Enumerology.Transform.Reject = reject
