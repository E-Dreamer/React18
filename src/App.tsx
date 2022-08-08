/* eslint-disable eqeqeq */
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { ConfigProvider } from 'antd'
import AuthRouter from '@/router/authRouter';
import Router from '@/router'
import { connect } from 'react-redux';
import useTheme from './hooks/useTheme';
import { getBrowserLang } from './utils';
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { setLanguage } from './store/global';

function App(props:any) {
  const {themeConfig,language,assemblySize} = props;
 
  const { weakOrGray } = themeConfig;
  const [i18nLocale, setI18nLocale] = useState(zhCN);
  // 全局使用主题
  useTheme(weakOrGray);
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
    setLanguage(language || getBrowserLang())
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

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
