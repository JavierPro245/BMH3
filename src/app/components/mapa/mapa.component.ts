///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UserI, ViajeI, ViajePasajeroI } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuComponent } from 'src/app/menu/menu.component';
import { PopoverController } from '@ionic/angular';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  uid: string = null
  info: UserI = null;
  
  usuarios: UserI[] = [];

  data:ViajeI={
    busqueda: '',
    nombre: '',
    direccion: '',
    referencia: '',
    ciudad: '',
    provincia: '',
    region: '',
    id: '',

  }

  

  data1:ViajePasajeroI={
    busqueda: '',
    direccion: '',
    referencia: '',
    ciudad: '',
    provincia: '',
    region: '',
    id: '',

  }

  credenciales = {
    correo: null,
    password: null,
    nombre: null,
  }

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  origen!: string;
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2,private authservice:AuthService,private popoverController: PopoverController,private firestoreService: FirestoreService
    ,private interaction : InteractionService) { 

    this.markers = [];

    this.formMapas = new FormGroup({

      busqueda: new FormControl(''),
      nombre: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl('')
    })
  }

  ngOnInit(): void {
    /*Aqui va el codigo que obtener los viajes  */
    console.log('Sitio para crear rutas');
    this.getViaje();
    this.getViaje2();
    this.authservice.stateUser().subscribe( res => {
      console.log('en perfil - estado auteticacion -> ',res);
      this.getUid();
      this.getUid2();

    });
    this.getUid(); 
    this.getUid2();

  }

  crearViaje(){

  
    this.interaction.showLoading('Creando..')

    const path = 'Viaje';
    const id = this.firestoreService.getId();
    this.data.id=id;
    this.firestoreService.createDoc(this.data,path, id).then((res)=>{
      console.log('Viaje creada exitosa');
      this.interaction.presentToast2('bottom','Viaje creado')
    })
    
  }
  getViaje(){
    this.firestoreService.getCollection2<UserI>('Usuarios').subscribe(res=>{
      console.log('Lectura a la base de datos', res);
      this.usuarios = res;
    })
  }

  async getUid() {
    const uid = await this.authservice.getUid();
    if (uid){
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser();
    }else{
      console.log('no existe uid');
    }
  }

  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.info = res;

      }
      console.log('datos son -> ', res);

    })
  }


  /*------------------------------------------------------------------------------------------------------------*/

  crearViaje2(){

  
    this.interaction.showLoading('Creando..')

    const path = 'ViajePasajero';
    const id = this.firestoreService.getId();
    this.data1.id=id;
    this.firestoreService.createDoc(this.data1,path, id).then((res)=>{
      console.log('Viaje creada exitosa');
      this.interaction.presentToast2('bottom','Viaje creado')
    })
    
  }
  getViaje2(){
    this.firestoreService.getCollection2<UserI>('Usuarios').subscribe(res=>{
      console.log('Lectura a la base de datos', res);
      this.usuarios = res;
    })
  }

  async getUid2() {
    const uid = await this.authservice.getUid();
    if (uid){
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser2();
    }else{
      console.log('no existe uid');
    }
  }

  getInfoUser2(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe( res => {
      if (res) {
        this.info = res;

      }
      console.log('datos son -> ', res);

    })
  }

  /*------------------------------------------------------------------------------------------------------------*/


  ngAfterViewInit(): void{
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position)
        await this.cargarMapa(position);
        this.cargarAutocomplete();

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }
  };
  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value)
  };


  //calcular ruta
  mapRuta(position: any): any {

    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();

    directionRender.setMap(this.mapa);

    directionService.route({

      origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      destination: 'La sinfonia 1060, Maipu, Chile',
      
      travelMode: google.maps.TravelMode.DRIVING

    }, resultado => {
      console.log(resultado);
      directionRender.setDirections(resultado);

      this.distancia = resultado.routes[0].legs[0].distance.text;

    });

  }





  private cargarAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })


    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();
      console.log("el place completo es:", place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });

      marker.setMap(this.mapa);
      this.llenarFormulario(place);
    })
  }

  llenarFormulario(place: any) {

    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {

          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };

    const componentForm = {
      direccion: 'location',
      ciudad: "administrative_area_level_3",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };




    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;

      this.formMapas.controls[key].setValue(getAddressComp(value))
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'))
  };

  cargarMapa(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: 'Ubicacion Actual',
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  };

  async openMenu(ev: any){
    console.log('abrir menú');
    const menu = await this.popoverController.create({
      component: MenuComponent,
      translucent: true,
      event: ev
    });

    await menu.present();
  }

}
