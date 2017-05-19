# vue-research

> H5可视化编辑

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 说明

* 前端部分使用vue2.2版本, 后端使用 nodejs + mongodb（https://git.oschina.net/liljay/xmb/tree/swagger/）

## 设计细节

1. vue + vuex + vue-router , ajax使用qwest
2. H5可编辑器，考虑到各种可配置UI组件的维护，把每一个都单独做成vue组件维护，利用vue 2.* function组件封装成统一的unit组件；

   用户选中新增组件的时候，unit组件通过组件名来实例化对应的组件，组件的初始化数据从component.props中取，由vuex进行统一管理；
   
   可配置的组件单独在vue-research-unit库维护，在h5页面渲染的时候，后端也通过这个库来注册基础组件并实例化页面；
   
   每一个UI组件对应一个可配置（setting-*）的vue组件，对UI组件属性进行更改配置；
    