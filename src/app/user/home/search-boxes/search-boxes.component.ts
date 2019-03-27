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
