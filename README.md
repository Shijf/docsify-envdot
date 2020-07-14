
# docsify-envdot
A docsify plugin that load different parameters according to different environments and use {{}} or cunstom
# Installation

```js   
<!-- Latest v2.x.x -->
<script src="https://unpkg.com/docsify-copy-code@2"></script>
```

# Use

Env can be customized as follows:

```js
window.$docsify = {
    env: {
        current: 'pro', // Here you fill in the specified environment
        interpolate: { // Here you fill in the interpolate if you want 
          startSymbol: '{{', 
          endSymbol: '}}'
        },
        // eg: 'test'
        test: { 
          a: 'test a'
        },
        // production
        pro: {
          a: 'pro a',
          b: 'pro b',
          c: 'pro c'
        }
      },
}
```

# Options

- current (required)


- interpolate 

# Example


- code

- show 
