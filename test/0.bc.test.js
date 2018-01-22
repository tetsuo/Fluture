import * as bc from '../src/internal/bc';

describe('bc', function(){

  describe('.setImmediate()', function(){

    it('calls the given function with the given argument', function(done){
      bc.setImmediate(done, null);
    });

  });

});
