/* eslint-disable eqeqeq */

import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { ConfigProvider } from 'antd'
import AuthRouter from '@/router/authRouter';
import Router from '@/router'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import useTheme from './hooks/useTheme';
import { getBrowserLang } from './utils';
// import { getRoutes } from './api/modules/menu';
// import { setAllRouter } from './store/global';
// import { changeRoute } from './utils';
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { setLanguage } from './store/global';

function App() {
  const global = useSelector((state: RootState) => state.global);
  const { themeConfig, token, language,assemblySize } = global;
  const { weakOrGray } = themeConfig;
  const [i18nLocale, setI18nLocale] = useState(zhCN);
  const dispatch = useDispatch()
  // 全局使用主题
  useTheme(weakOrGray);

  //拉去后台返回的路由
  if (token) {
    console.log('进来次数')
    // getRoutes().then(res => {
    //   const data = res.data && filterAllRoutes(res.data)
    //   console.log('data: ', data);
    //   // dispatch(setAllRouter(data))
    //   // data && changeRoute(data)

    //   // dispatch(setAllRouter(data))
    // }).catch(err=>console.log(err))
  }

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "zh") return setI18nLocale(zhCN);
    if (language && language == "en") return setI18nLocale(enUS);
    if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
    if (getBrowserLang() == "en") return setI18nLocale(enUS);
  };

  useEffect(() => {
    // 全局使用国际化
    // i18n.changeLanguage(language || getBrowserLang());
    dispatch(setLanguage(language || getBrowserLang()));
    setAntdLanguage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <BrowserRouter>
      <Suspense>
        <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </ConfigProvider>
      </Suspense>
    </BrowserRouter>
  );
}


export default App

