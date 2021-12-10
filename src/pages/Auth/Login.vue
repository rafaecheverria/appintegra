<template>
  <auth-layout pageClass="login-page">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <ValidationObserver v-slot="{ handleSubmit }">
          <!--You can specify transitions on initial render. The `card-hidden` class will be present initially and then it will be removed-->
          <form @submit.prevent="handleSubmit(procesarFormulario)">
            <fade-render-transition>
              <card>
                <div slot="header">
                  <h3 class="card-title text-center">Login</h3>
                </div>
                <div>
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input  type="email"
                               :error="failed ? 'el Email es un campo requerido': null"
                               :hasSuccess="passed"
                               label="Email address"
                               name="email"
                               v-model="form.email">
                    </fg-input>
                  </ValidationProvider>
                  <ValidationProvider
                    name="password"
                    rules="required|min:5"
                    v-slot="{ passed, failed }"
                  >
                    <fg-input  type="password"
                               :error="failed ? 'La contraseña es un campo requerido': null"
                               :hasSuccess="passed"
                               name="password"
                               label="Password"
                               v-model="form.password">
                    </fg-input>
                  </ValidationProvider>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-fill btn-info btn-round btn-wd ">Login</button>
                  <br>
                  <div class="forgot">
                    <router-link to="/register" class="card-category">
                      ¿Olvidaste tu contraseña?
                    </router-link>
                  </div>
                </div>
              </card>
            </fade-render-transition>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </auth-layout>
</template>
<script>
import { FadeRenderTransition } from 'src/components/index'
import AuthLayout from './AuthLayout.vue'
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import { mapActions } from 'vuex'

extend("email", email);
extend("required", required);
extend("min", min);

  export default {
    components: {
      FadeRenderTransition,
      AuthLayout
    },
    computed: {
        bloquear() {
            if(!this.form.email.includes('@')){
                return true
            }
            if(this.form.password.length >= 5){
                return false
            }
            return true
        }
    },
    data() {
      return {
        form: {
          email: 'rafaecheverria@live.cl',
          password: 'raer2608',
        },
        subscribe: true
      };
    },
    methods: {
       ...mapActions({
            login: 'auth/login',
        }),
        async procesarFormulario() {
            await this.login(this.form)
            await this.$router.push({ name: 'Home' })
            this.form.email = ''
            this.form.password = ''
        },
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
  .navbar-nav .nav-item p{
    line-height: inherit;
    margin-left: 5px;
  }
</style>
