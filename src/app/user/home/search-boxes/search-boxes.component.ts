import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopsService, FilterKeys } from './../../shops/shops.service';
import { Location } from './../../location/location.model';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search-boxes',
  templateUrl: './search-boxes.component.html',
  styleUrls: ['./search-boxes.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class HomeSearchComponent implements OnInit {
  filter: FormGroup;
  public exampleData:Array<Select2OptionData>;
  public options:Options;

  // @Output() nameFilterChange = new EventEmitter();
  // @Output() locationFilterChange = new EventEmitter();

    /*
    locations: Location [] = [
      {
        id: 1,
        name: 'UP Asian Institute of Tourism',
        coordinates: {
          lat: 14.660688,
          long: 121.061188
        }
      }, 
      {
        id: 2,
        name:'College of Human Kinetics',
        coordinates: {
          lat: 14.659188, 
          long :121.062812
        }
      },
      {
        id: 3,
        name: 'UP SOLAIR',
        coordinates:  {
          lat: 14.657313,
          long: 121.061687
        }
      }, 
      {
        id: 4,
        name: 'UP Department of Military Science & Tactics Complex',
        coordinates: {
          lat: 14.658813, 
          long: 121.064312
        }
      },
      {
        id: 5,
        name: 'UP College of Social Work and Community Development',
        coordinates: {
          lat: 14.657188,
          long: 121.063688
        }
      },
      {
        id: 6,
        name: 'UP College of Mass Communication',
        coordinates: {
          lat: 14.656563, 
          long: 121.064438
        }
      },
      {
        id: 7,
        name: 'UP Film Institute',
        coordinates: {
          lat: 14.656313, 
          long: 121.063313
        }
      },
      {
        id:8,
        name: 'UP College of Music',
        coordinates: {
          lat: 14.657062, 
          long: 121.065313
        }
      },
      {
        id:9,
        name: 'Ang Bahay ng Alumni',
        coordinates: {
          lat: 14.658062, 
          long: 121.066688
        }
      },
      {
        id:10,
        name: 'University Theatre',
        coordinates: {
          lat: 14.656687, 
          long: 121.066062
        }
      },
      {
        id:11,
        name:'UP Cine Adarna',
        coordinates:  {
          lat:14.656813, 
          long: 121.067063
        }
      },
      {
        id:12,
        name:'Molave Residence Hall',
        coordinates: {
          lat: 14.657938, 
          long: 121.067688
        }
      },
      {
        id:13,
        name:'Kalayaan Residence Hall',
        coordinates: {
          lat: 14.658937, 
          long: 121.069063
        }
      },
      {
        id:14,
        name: 'Yakal Residence Hall',
        coordinates: {
          lat: 14.657938, 
          long: 121.069063
        }
      },
      {
        id:15,
        name:'Ipil Residence Hall',
        coordinates: {
          lat: 14.657938, 
          long: 121.070187
        }
      },
      {
        id:16,
        name: 'Acacia Residence Hall',
        coordinates: {
          lat: 14.659438, 
          long: 121.070687
        }
      },
      {
        id:17,
        name: 'Melchor Hall',
        coordinates: {
          lat: 14.656687, 
          long: 121.069562
        }
      },
      {
        id:18,
        name:'University Computer Center',
        coordinates: {
          lat: 14.657313, 
          long: 121.069938
        }
      },
      {
        id: 19,
        name:'National Center for Tranportation Studies',
        coordinates: {
          lat: 14.656938, 
          long: 121.070187
        }
      },
      {
        id:20,
        name:"UP Cashier's Office",
        coordinates: {
          lat: 14.660063, 
          long: 121.070313
        }
      },
      {
        id:21,
        name: 'University Health Service',
        coordinates: {
          lat:14.659813, 
          long:121.071063
        }
      },
      {
        id:22,
        name:'Parish of the Holy Sacrifice',
        coordinates: {
          lat:14.658813, 
          long:121.071188
        }
      },
      {
        id:23,
        name:'National Engineering Center',
        coordinates: {
          lat:14.656563, 
          long: 121.071438
        }
      },
      {
        id:24,
        name:'UP College of Law',
        coordinates: {
          lat: 14.656438, 
          long:121.072188
        }
      },
      {
        id:25,
        name:'Church of the Risen Lord',
        coordinates: {
          lat: 14.659563, 
          long:121.072313
        }
      },
      {
        id:26,
        name:'Ilang Ilang Residence Hall',
        coordinates: {
          lat:14.659438, 
          long:121.073438
        }
      },
      {
        id:27,
        name:'International Center',
        coordinates: {
          lat:14.658188, 
          long:121.073188
        }
      },
      {
        id:28,
        name:'GT-Toyota Asian Center',
        coordinates: {
          lat:14.656938, 
          long:121.073438
        }
      }, 
      {
        id:29,
        name:'UP School of Economics',
        coordinates: {
          lat:14.656063, 
          long:121.073563
        }
      },
      {
        id:30,
        name:'UP College of Business Administration (Virata School of Business)',
        coordinates: {
          lat:14.655187, 
          long:121.073813
        }
      },
      {
        id:31,
        name:"Vinzon's Hall",
        coordinates: {
          lat:14.653937, 
          long:121.073438
        }
      },
      {
        id:32,
        name: 'UP Integrated School - High School',
        coordinates:{
          lat:14.652813, 
          long:121.073188
        }
      },
      {
        id:33,
        name:'UP Integrated School - Elementary',
        coordinates: {
          lat:14.652813, 
          long:121.072063
        }
      },
      {
        id: 34,
        name:'UP Integrated School - K2',
        coordinates: {
          lat:14.652312, 
          long: 121.072562
        }
      },
      {
        id:35,
        name: 'UP College of Home Economics',
        coordinates: {
          lat:14.651938, 
          long:121.073313
        }
      },
      {
        id:36,
        name:'UP College of Education',
        coordinates: {
          lat:14.653313, 
          long:121.072313
        }
      },
      {
        id:37,
        name:'PAGASA Astronomical Observatory',
        coordinates: {
          lat:14.651063, 
          long:121.072313
        }
      },
      {
        id:38,
        name: 'UP Institute of Chemistry - Research Building',
        coordinates: {
          lat:14.650688, 
          long:121.073062
        }
      },
      {
        id:39,
        name: 'UP Institute of Checmistry - Teaching Building',
        coordinates: {
          lat:14.650063, 
          long:121.073062
        }
      },
      {
        id:40,
        name:'National Institute of Physics',
        coordinates: {
          lat:14.649063, 
          long:121.073313
        }
      },
      {
        id:41,
        name:'Institute of Mathematics',
        coordinates: {
          lat:14.648438, 
          long:121.071438
        }
      },
      {
        id:42,
        name:'College of Science Amphitheater',
        coordinates: {
          lat:14.649813, 
          long:121.071937
        }
      },
      {
        id:43,
        name:'College of Science Admin Building',
        coordinates: {
          lat:14.649813, 
          long:121.070812
        }
      },
      {
        id:44,
        name:'Lagmay Hall (Palma Hall Annex)',
        coordinates: {
          lat:14.653437, 
          long:121.071438
        }
      },
      {
        id:45,
        name:'Sampaguita Residence Hall',
        coordinates: {
          lat:14.652188, 
          long:121.071438
        }
      },
      {
        id:46,
        name: 'Philippine Genome Center',
        coordinates: {
          lat:14.651438, 
          long:121.071688
        }
      },
      {
        id:47,
        name:'National Institute of Molecular Biology and Biotechnology (NIMBB)',
        coordinates: {
          lat:14.650812, 
          long:121.071688
        }
      },
      {
        id:48,
        name:'Institute of Biology',
        coordinates: {
          lat:14.650541, 
          long:121.070759
        }
      },
      {
        id:49,
        name:'Kamia Residence Hall',
        coordinates: {
          lat:14.651938, 
          long:121.070313
        }
      },
      {
        id:50,
        name:'Palma Hall',
        coordinates: {
          lat:14.653313, 
          long:121.069813
        }
      },
      {
        id:51,
        name:'National Sciences Research Institute',
        coordinates: {
          lat:14.652062, 
          long:121.068937
        }
      },
      {
        id:52,
        name:'UP Diliman Information Technology Development Center (UP ITDC)',
        coordinates: {
          lat:14.651938, 
          long:121.068188
        }
      }, 
      {
        id:53,
        name:'UP College of Arts and Letters',
        coordinates: {
          lat:14.652687, 
          long:121.067313
        }
      },
      {
        id:54,
        name: 'Vargas Museum',
        coordinates: {
          lat:14.653313, 
          long:121.066813
        }
      },
      {
        id:55,
        name:'UP NISMED Hostel',
        coordinates: {
          lat:14.651688, 
          long:121.068062
        }
      }, 
      {
        id:56,
        name: 'Marine Science Institute',
        coordinates: {
          lat:14.650437, 
          long:121.069188
        }
      },
      {
        id:57,
        name:'College of Science Library',
        coordinates: {
          lat:14.649188, 
          long:121.069438
        }
      },
      {
        id:58,
        name:'UP Electrical and Electronics Engineering Institute',
        coordinates: {
          lat:14.649562, 
          long:121.068312
        }
      },
      {
        id:59,
        name:"UP Alumni Engineers' Centennial Hall",
        coordinates: {
          lat:14.648438, 
          long:121.068437
        }
      },
      {
        id:60,
        name:'Department of Mining Metallurgical and Materials Engineering (DMMME)',
        coordinates: {
          lat:14.648187, 
          long:121.067938
        }
      },
      {
        id:61,
        name:'UP School of Statistics',
        coordinates: {
          lat:14.651063, 
          long:121.067063
        }
      },
      {
        id:62,
        name:'Office of the University Registrar',
        coordinates: {
          lat:14.651187, 
          long:121.066813
        }
      }, 
      {
        id:63,
        name:'UP Diliman Police Station and Fire Department',
        coordinates: {
          lat:14.651938, 
          long:121.065438
        }
      },
      {
        id:64,
        name:'Bethany Baptist Church Diliman',
        coordinates: {
          lat:14.652687, 
          long:121.065063
        }
      },
      {
        id:65,
        name:'UP Press',
        coordinates: {
          lat:14.652438, 
          long:121.064812
        }
      },
      {
        id:66,
        name:'UP College of Architecture',
        coordinates: {
          lat:14.651313, 
          long:121.065063
        }
      },
      {
        id:67,
        name:'PAUW-UP Child Study Center',
        coordinates: {
          lat:14.650188, 
          long:121.065937
        }
      },
      {
        id:68,
        name:'UP Diliman Institute of Civil Engineering',
        coordinates: {
          lat:14.648688, 
          long:121.066188
        }
      },
      {
        id:69,
        name:'UP Diliman Department of Chemical Engineering',
        coordinates: {
          lat:14.648313, 
          long:121.067187
        }
      },
      {
        id:70,
        name:'UP College of Fine Arts',
        coordinates: {
          lat:14.652188, 
          long:121.061812
        }
      },
      {
        id:71,
        name:'UP Veterinary Teaching Hospital, Diliman Station',
        coordinates:{
          lat:14.651812, 
          long:121.060938
        }
      },
      {
        id:72,
        name:'Campus Maintenance Office, Business Concession Office',
        coordinates: {
          lat:14.652438, 
          long:121.060188
        }
      },
      {
        id:73,
        name:'Centennial Residence Hall',
        coordinates: {
          lat:14.647687, 
          long:121.062563
        }
      }, 
      {
        id:74,
        name: 'UP Diliman Main Library',
        coordinates: {
          lat:14.654937, 
          long:121.071063
        }
      }, 
      {
        id: 75,
        name: 'Sunken Garden',
        coordinates: {
          lat:14.655096, 
          long:121.072281
        }
      },
      {
        id: 76,
        name:'U.P. Lagoon',
        coordinates: {
          lat:14.654919, 
          long:121.067616
        }
      }
    ]
    */
   constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopsService) { }


  ngOnInit() {
    this.filter = this.fb.group({
      fcs: new FormControl(this.shopService.filter.fcs),
      location: new FormControl(this.shopService.filter.location)
    });

    // this.filter.get('fcs').valueChanges.subscribe((name) => {
    //   this.nameFilterChange.emit(name);
    // });

    // this.filter.get('location').valueChanges.subscribe((location) => {
    //   this.locationFilterChange.emit(location);
    // });
    this.exampleData = [
      {
        id:'',
        text:'location'
      },
      {
        id: '1',
        text: 'UP Asian Institute of Tourism'
      }, 
      {
        id: '2',
        text:'College of Human Kinetics'

      },
      {
        id: '3',
        text: 'UP SOLAIR'

      }, 
      {
        id: '4',
        text: 'UP Department of Military Science & Tactics Complex'
      },
      {
        id: '5',
        text: 'UP College of Social Work and Community Development'
      },
      {
        id: '6',
        text: 'UP College of Mass Communication'
      },
      {
        id: '7',
        text: 'UP Film Institute'
      },
      {
        id:'8',
        text: 'UP College of Music'
      },
      {
        id:'9',
        text: 'Ang Bahay ng Alumni'
      },
      {
        id:'10',
        text: 'University Theatre'
      },
      {
        id:'11',
        text:'UP Cine Adarna'
      },
      {
        id:'12',
        text:'Molave Residence Hall'
      },
      {
        id:'13',
        text:'Kalayaan Residence Hall'
      },
      {
        id:'14',
        text: 'Yakal Residence Hall'
      },
      {
        id:'15',
        text:'Ipil Residence Hall'      },
      {
        id:'16',
        text: 'Acacia Residence Hall'
      },
      {
        id:'17',
        text: 'Melchor Hall'
      },
      {
        id:'18',
        text:'University Computer Center'
      },
      {
        id: '19',
        text:'National Center for Tranportation Studies'      
      },
      {
        id:'20',
        text:"UP Cashier's Office"
      },
      {
        id:'21',
        text: 'University Health Service'
      },
      {
        id:'22',
        text:'Parish of the Holy Sacrifice'
      },
      {
        id:'23',
        text:'National Engineering Center'
      },
      {
        id:'24',
        text:'UP College of Law'
      },
      {
        id:'25',
        text:'Church of the Risen Lord'
      },
      {
        id:'26',
        text:'Ilang Ilang Residence Hall'
      },
      {
        id:'27',
        text:'International Center'
      },
      {
        id:'28',
        text:'GT-Toyota Asian Center'
      }, 
      {
        id:'29',
        text:'UP School of Economics'
      },
      {
        id:'30',
        text:'UP College of Business Administration (Virata School of Business)'
      },
      {
        id:'31',
        text:"Vinzon's Hall"
      },
      {
        id:'32',
        text: 'UP Integrated School - High School'
      },
      {
        id:'33',
        text:'UP Integrated School - Elementary'
      },
      {
        id: '34',
        text:'UP Integrated School - K2'
      },
      {
        id:'35',
        text: 'UP College of Home Economics'
      },
      {
        id:'36',
        text:'UP College of Education'
      },
      {
        id:'37',
        text:'PAGASA Astronomical Observatory'
      },
      {
        id:'38',
        text: 'UP Institute of Chemistry - Research Building'
      },
      {
        id:'39',
        text: 'UP Institute of Checmistry - Teaching Building'
        
      },
      {
        id:'40',
        text:'National Institute of Physics'
      },
      {
        id:'41',
        text:'Institute of Mathematics'
      },
      {
        id:'42',
        text:'College of Science Amphitheater'
      },
      {
        id:'43',
        text:'College of Science Admin Building'
      },
      {
        id:'44',
        text:'Lagmay Hall (Palma Hall Annex)'
      },
      {
        id:'45',
        text:'Sampaguita Residence Hall'
      },
      {
        id:'46',
        text: 'Philippine Genome Center'
      },
      {
        id:'47',
        text:'National Institute of Molecular Biology and Biotechnology (NIMBB)'
      },
      {
        id:'48',
        text:'Institute of Biology'
      },
      {
        id:'49',
        text:'Kamia Residence Hall'
      },
      {
        id:'50',
        text:'Palma Hall'
      },
      {
        id:'51',
        text:'National Sciences Research Institute'
      },
      {
        id:'52',
        text:'UP Diliman Information Technology Development Center (UP ITDC)'
      }, 
      {
        id:'53',
        text:'UP College of Arts and Letters'
      },
      {
        id:'54',
        text: 'Vargas Museum'
      },
      {
        id:'55',
        text:'UP NISMED Hostel'
      }, 
      {
        id:'56',
        text: 'Marine Science Institute'
      },
      {
        id:'57',
        text:'College of Science Library'
      },
      {
        id:'58',
        text:'UP Electrical and Electronics Engineering Institute'
      },
      {
        id:'59',
        text:"UP Alumni Engineers' Centennial Hall"
      },
      {
        id:'60',
        text:'Department of Mining Metallurgical and Materials Engineering (DMMME)'
      },
      {
        id:"61",
        text:'UP School of Statistics'
      },
      {
        id:'62',
        text:'Office of the University Registrar'
      }, 
      {
        id:'63',
        text:'UP Diliman Police Station and Fire Department'      },
      {
        id:'64',
        text:'Bethany Baptist Church Diliman'
      },
      {
        id:'65',
        text:'UP Press'
      },
      {
        id:'66',
        text:'UP College of Architecture'
      },
      {
        id:'67',
        text:'PAUW-UP Child Study Center'
      },
      {
        id:'68',
        text:'UP Diliman Institute of Civil Engineering'
      },
      {
        id:'69',
        text:'UP Diliman Department of Chemical Engineering'
      },
      {
        id:'70',
        text:'UP College of Fine Arts'
      },
      {
        id:'71',
        text:'UP Veterinary Teaching Hospital, Diliman Station'
      },
      {
        id:'72',
        text:'Campus Maintenance Office, Business Concession Office'
      },
      {
        id:'73',
        text:'Centennial Residence Hall'
      }, 
      {
        id:'74',
        text: 'UP Diliman Main Library'
      }, 
      {
        id: '75',
        text: 'Sunken Garden'
      },
      {
        id: '76',
        text:'U.P. Lagoon'
      }
    ];

    this.options = {
      multiple: false,
      closeOnSelect: true,
      width: '295',
      placeholder:"location"
    }
  }


  setFiltersAndRedirect() {
    this.shopService.setFilter(FilterKeys.Location, this.filter.get('location').value);
    this.shopService.setFilter(FilterKeys.FCS, this.filter.get('fcs').value);

    if (this.route.snapshot.url.toString() !== 'search') {
      this.router.navigate(['/user/search']);
    }
  }


}
