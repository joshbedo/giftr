/**
 * fullPage 1.6.6
 * https://github.com/alvarotrigo/fullPage.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */
html, body {
    margin: 0;
    padding: 0;
    overflow:hidden;
}
#superContainer {
    height: 100%;
    position: relative;
    
    /* Touch detection for Windows 8 */
    -ms-touch-action: none; 
}
.section {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.slide {
    float: left;
}
.slide, .slidesContainer {
    height: 100%;
    display: block;
}
.slides {
    height: 100%;
    overflow: hidden;
    position: relative;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.section.table, .slide.table {
    display: table;
    width: 100%;
}
.tableCell {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 100%;
}
.slidesContainer {
    float: left;
    position: relative;
}
.controlArrow {
    position: absolute;
    top: 50%;
    cursor: pointer;
    width: 0;
    height: 0;
    border-style: solid;
    margin-top: -38px;
}
.controlArrow.prev {
    left: 15px;
    width: 0;
    border-width: 38.5px 34px 38.5px 0;
    border-color: transparent #fff transparent transparent;
}
.controlArrow.next {
    right: 15px;
    border-width: 38.5px 0 38.5px 34px;
    border-color: transparent transparent transparent #fff;
}
.scrollable {
    overflow: scroll;
}
.easing {
    -webkit-transition: all 0.7s ease-out;
    -moz-transition: all 0.7s ease-out;
    -o-transition: all 0.7s ease-out;
    transition: all 0.7s ease-out;
}
#fullPage-nav {
    position: fixed;
    z-index: 100;
    margin-top: -32px;
    top: 50%;
    opacity: 1;
}
#fullPage-nav.right {
    right: 17px;
}
#fullPage-nav.left {
    left: 17px;
}
.fullPage-slidesNav {
    position: absolute;
    z-index: 4;
    left: 50%;
    opacity: 1;
}
.fullPage-slidesNav.bottom {
    bottom: 17px;
}
.fullPage-slidesNav.top {
    top: 17px;
}
#fullPage-nav ul,
.fullPage-slidesNav ul {
  margin: 0;
  padding: 0;
}
#fullPage-nav li,
.fullPage-slidesNav li {
    display: block;
    width: 14px;
    height: 13px;
    margin: 7px;
    position:relative;
}
.fullPage-slidesNav li {
    display: inline-block;
}
#fullPage-nav li a,
.fullPage-slidesNav li a {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
}
#fullPage-nav li .active span,
.fullPage-slidesNav .active span {
    background: #333;
}
#fullPage-nav span,
.fullPage-slidesNav span {
    top: 2px;
    left: 2px;
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    background: rgba(0, 0, 0, 0);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
}
.fullPage-tooltip {
    position: absolute;
    color: #fff;
    font-size: 14px;
    font-family: arial, helvetica, sans-serif;
    top: -2px;
}
.fullPage-tooltip.right {
    right: 20px;
}
.fullPage-tooltip.left {
    left: 20px;
}
