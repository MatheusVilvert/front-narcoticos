// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import Group from './components/Group';
import Add from './components/Add'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Group},
    {path:'/add', component: Add}
  ]
})

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: ` 
        <div id="page_data_controller">
            <!-- Navigation-->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <a class="navbar-brand" href="index.html">
                    <img src="http://lh3.googleusercontent.com/di9WWOCU1FwqqYt8Cj2jcNVsUsgO7b3SZyr21pSiL9Qeoh8uyqHQif97AAV1q5QtFw=w300" alt="Logo" title="Home page" class="logo"/>
                    Narcoticos Admin
                </a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
                        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <a class="nav-link" href="#" v-on:click="open_module('home')">
                                <i class="fa fa-fw fa-home"></i>
                                <span class="nav-link-text">Home</span>
                            </a>
                        </li>
                        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                            <a class="nav-link" href="charts.html">
                                <i class="fa fa-fw fa-calendar"></i>
                                <span class="nav-link-text">Events</span>
                            </a>
                        </li>
                        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
                            <a class="nav-link" href="tables.html">
                                <i class="fa fa-fw fa-users"></i>
                                <span class="nav-link-text">Groups</span>
                            </a>
                        </li>
                        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">

                            <a href="#" v-on:click="open_module('IndexJustForToday')" class="nav-link-text nav-link">
                                <i class="fa fa-fw fa-list"></i>
                                Just for Today
                            </a>
                        </li>
                        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
                            <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
                                <i class="fa fa-fw fa-meetup"></i>
                                <span class="nav-link-text">Meetings</span>
                            </a>
                            <ul class="sidenav-second-level collapse" id="collapseComponents">
                                <li>
                                    <a href="#" v-on:click="open_module('online_meeting')">
                                        <i class="fa fa-share-square-o"></i>
                                        Online Meetings
                                    </a>
                                </li>
                                <li>
                                    <a href="cards.html">
                                        <i class="fa fa-fw fa-share-square"></i>
                                        Presential Meetings
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="navbar-nav sidenav-toggler">
                        <li class="nav-item">
                            <a class="nav-link text-center" id="sidenavToggler">
                                <i class="fa fa-fw fa-angle-left"></i>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                            <i class="fa fa-fw fa-sign-out"></i>Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="content-wrapper">

                <div class="container-fluid">
                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">My Dashboard</li>
                    </ol>
                    <div class="card mb-3 page_data_content">
                        <!-- aqui vai conteudo carregado de forma assincrona -->
                            <!--<div class="card-header">
                                <i class="fa fa-table"></i> Data Table Example</div>
                                <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Position</th>
                                      <th>Office</th>
                                      <th>Age</th>
                                      <th>Start date</th>
                                      <th>Salary</th>
                                    </tr>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                      <th>Name</th>
                                      <th>Position</th>
                                      <th>Office</th>
                                      <th>Age</th>
                                      <th>Start date</th>
                                      <th>Salary</th>
                                    </tr>
                                    </tfoot>
                                    <tbody>
                                    <tr>
                                      <td>Tiger Nixon</td>
                                      <td>System Architect</td>
                                      <td>Edinburgh</td>
                                      <td>61</td>
                                      <td>2011/04/25</td>
                                      <td>$320,800</td>
                                    </tr>
                                    <tr>
                                      <td>Garrett Winters</td>
                                      <td>Accountant</td>
                                      <td>Tokyo</td>
                                      <td>63</td>
                                      <td>2011/07/25</td>
                                      <td>$170,750</td>
                                    </tr>
                                    <tr>
                                      <td>Ashton Cox</td>
                                      <td>Junior Technical Author</td>
                                      <td>San Francisco</td>
                                      <td>66</td>
                                      <td>2009/01/12</td>
                                      <td>$86,000</td>
                                    </tr>
                                    <tr>
                                      <td>Cedric Kelly</td>
                                      <td>Senior Javascript Developer</td>
                                      <td>Edinburgh</td>
                                      <td>22</td>
                                      <td>2012/03/29</td>
                                      <td>$433,060</td>
                                    </tr>
                                    <tr>
                                      <td>Airi Satou</td>
                                      <td>Accountant</td>
                                      <td>Tokyo</td>
                                      <td>33</td>
                                      <td>2008/11/28</td>
                                      <td>$162,700</td>
                                    </tr>
                                    <tr>
                                      <td>Brielle Williamson</td>
                                      <td>Integration Specialist</td>
                                      <td>New York</td>
                                      <td>61</td>
                                      <td>2012/12/02</td>
                                      <td>$372,000</td>
                                    </tr>
                                    <tr>
                                      <td>Herrod Chandler</td>
                                      <td>Sales Assistant</td>
                                      <td>San Francisco</td>
                                      <td>59</td>
                                      <td>2012/08/06</td>
                                      <td>$137,500</td>
                                    </tr>
                                    <tr>
                                      <td>Rhona Davidson</td>
                                      <td>Integration Specialist</td>
                                      <td>Tokyo</td>
                                      <td>55</td>
                                      <td>2010/10/14</td>
                                      <td>$327,900</td>
                                    </tr>
                                    <tr>
                                      <td>Colleen Hurst</td>
                                      <td>Javascript Developer</td>
                                      <td>San Francisco</td>
                                      <td>39</td>
                                      <td>2009/09/15</td>
                                      <td>$205,500</td>
                                    </tr>
                                    <tr>
                                      <td>Sonya Frost</td>
                                      <td>Software Engineer</td>
                                      <td>Edinburgh</td>
                                      <td>23</td>
                                      <td>2008/12/13</td>
                                      <td>$103,600</td>
                                    </tr>
                                    <tr>
                                      <td>Jena Gaines</td>
                                      <td>Office Manager</td>
                                      <td>London</td>
                                      <td>30</td>
                                      <td>2008/12/19</td>
                                      <td>$90,560</td>
                                    </tr>
                                    <tr>
                                      <td>Quinn Flynn</td>
                                      <td>Support Lead</td>
                                      <td>Edinburgh</td>
                                      <td>22</td>
                                      <td>2013/03/03</td>
                                      <td>$342,000</td>
                                    </tr>
                                    <tr>
                                      <td>Charde Marshall</td>
                                      <td>Regional Director</td>
                                      <td>San Francisco</td>
                                      <td>36</td>
                                      <td>2008/10/16</td>
                                      <td>$470,600</td>
                                    </tr>
                                    <tr>
                                      <td>Haley Kennedy</td>
                                      <td>Senior Marketing Designer</td>
                                      <td>London</td>
                                      <td>43</td>
                                      <td>2012/12/18</td>
                                      <td>$313,500</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer small text-muted">Narcoticos Anônimos</div>-->
                    </div>
                </div>
                <footer class="sticky-footer">
                    <div class="container">
                        <div class="text-center">
                            <small>Copyright © 2017 - UCDB - HIGH TECH - NA</small>
                        </div>
                    </div>
                </footer>
                <!-- Scroll to Top-->
                <a class="scroll-to-top rounded" href="#page-top">
                  <i class="fa fa-angle-up"></i>
                </a>
                <!-- Logout Admin System-->
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a class="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <router-view></router-view>
        </div>   

`
}).$mount('#app')
